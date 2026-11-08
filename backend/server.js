
// =======================
// ENVIRONMENT CONFIGURATION
// =======================

require("dotenv").config();

// =======================
// IMPORTS
// =======================

const express = require("express");
const db = require("./db");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// =======================
// SUBJECT TOPIC COUNTS
// =======================

const SUBJECT_TOPIC_COUNTS = {
    c_programming: 23,
    python: 25,
    ds: 25,
    eee: 25,
    daa: 25,
    cpp: 25,
    web: 25,
    dbms: 25,
    os: 25,
    cn: 25,
    java: 25,
    ai: 25,
    cloud: 25,
    cyber: 25
};

// =======================
// EXPRESS CONFIGURATION
// =======================

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// JWT AUTHENTICATION
// =======================

function authenticateToken(req, res, next) {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Access denied. Please login."
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid authentication token."
        });
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, user) => {

            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Session expired. Please login again."
                });
            }

            req.user = user;
            next();

        }
    );

}

// =======================
// BREVO SMTP CONFIGURATION
// =======================

const transporter = nodemailer.createTransport({

    host: process.env.BREVO_HOST,

    port: Number(process.env.BREVO_PORT || 587),

    secure: false,

    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }

});

// =======================
// OTP STORAGE
// =======================

const otpStore = {};

const verifiedEmails = {};

// =======================
// HOME ROUTE
// =======================

app.get("/", (req, res) => {

    res.send("Student Helper Hub Backend Running 🚀");

});

// =======================
// SEND OTP
// =======================

app.post("/send-otp", async (req, res) => {

    console.log("STEP 1: SEND OTP ROUTE HIT");

    const { email } = req.body;

    if (!email) {
        return res.json({
            success: false,
            message: "Email is required"
        });
    }

    const checkSql = "SELECT id FROM users WHERE email = ?";

    console.log("STEP 2: Starting database query");

    db.query(checkSql, [email], async (err, result) => {

        console.log("STEP 3: Database callback received");

        if (err) {
            console.error("Database error:", err.message);

            return res.json({
                success: false,
                message: "Database error"
            });
        }

        if (result.length > 0) {
            return res.json({
                success: false,
                message: "Account already exists. Please login."
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        otpStore[email] = {
            otp: otp,
            expiresAt: Date.now() + 10 * 60 * 1000
        };

        try {

            console.log("STEP 4: Starting Brevo email");

            await transporter.sendMail({

                from: `"Student Helper Hub" <${process.env.BREVO_SENDER}>`,

                to: email,

                subject: "Student Helper Hub - Email Verification OTP",

                text: `Your OTP for Student Helper Hub is: ${otp}

This OTP will expire in 10 minutes.

Do not share this OTP with anyone.`

            });

            console.log("STEP 5: Brevo email sent");

            console.log("OTP sent successfully to:", email);

            return res.json({
                success: true,
                message: "OTP sent successfully to your email"
            });

        } catch (error) {

            console.error("Brevo Email Error:", error.message);

            delete otpStore[email];

            return res.json({
                success: false,
                message: "Failed to send OTP. Please try again."
            });

        }

    });

});

// =======================
// VERIFY OTP
// =======================

app.post("/verify-otp", (req, res) => {

    const { email, otp } = req.body;

    if (!email || !otp) {

        return res.json({
            success: false,
            message: "Email and OTP are required"
        });

    }

    const storedData = otpStore[email];

    if (!storedData) {

        return res.json({
            success: false,
            message: "No OTP found. Please request a new OTP."
        });

    }

    if (Date.now() > storedData.expiresAt) {

        delete otpStore[email];

        return res.json({
            success: false,
            message: "OTP has expired. Please request a new OTP."
        });

    }

    if (storedData.otp !== String(otp)) {

        return res.json({
            success: false,
            message: "Invalid OTP. Please try again."
        });

    }

    verifiedEmails[email] = {
        verifiedAt: Date.now()
    };

    delete otpStore[email];

    return res.json({
        success: true,
        message: "Email verified successfully ✅"
    });

});

// =======================
// REGISTER ROUTE
// =======================

app.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

        return res.json({
            success: false,
            message: "All fields required"
        });

    }

    if (!verifiedEmails[email]) {

        return res.json({
            success: false,
            message: "Please verify your email with OTP first."
        });

    }

    try {

        const checkSql =
            "SELECT id FROM users WHERE email = ?";

        db.query(checkSql, [email], async (err, result) => {

            if (err) {

                console.error("Database Error:", err.message);

                return res.json({
                    success: false,
                    message: "Database error"
                });

            }

            if (result.length > 0) {

                return res.json({
                    success: false,
                    message: "Account already exists. Please login."
                });

            }

            try {

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                const sql = `
                    INSERT INTO users
                    (name, email, password)
                    VALUES (?, ?, ?)
                `;

                db.query(
                    sql,
                    [name, email, hashedPassword],
                    (err, result) => {

                        if (err) {

                            console.error("Registration Error:", err.message);

                            return res.json({
                                success: false,
                                message: "Registration failed"
                            });

                        }

                        delete verifiedEmails[email];

                        return res.json({
                            success: true,
                            message: "User Registered Successfully ✅"
                        });

                    }
                );

            }
            catch (error) {

                console.error("Password Hashing Error:", error.message);

                return res.json({
                    success: false,
                    message: "Registration failed"
                });

            }

        });

    }
    catch (error) {

        console.error("Registration Error:", error.message);

        return res.json({
            success: false,
            message: "Registration failed"
        });

    }

});
// =======================
// LOGIN ROUTE
// =======================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {

        return res.json({
            success: false,
            message: "Email and password are required"
        });

    }

    const sql =
        "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {

        if (err) {

            console.log("Login Database Error:", err);

            return res.json({
                success: false,
                message: "Database error"
            });

        }


        // Email does not exist
        if (result.length === 0) {

            return res.json({
                success: false,
                message:
                    "Account not found. Please create a new account first."
            });

        }


        const user = result[0];


        // Compare entered password with hashed password
        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        // Wrong password
        if (!isMatch) {

            return res.json({
                success: false,
                message: "Invalid email or password"
            });

        }


        // ==========================
        // CREATE JWT TOKEN
        // ==========================

        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "2h"
            }

        );


        // ==========================
        // LOGIN SUCCESS
        // ==========================

        res.json({

            success: true,

            message: "Login Success ✅",

            token: token,

            user: {

                id: user.id,
                name: user.name,
                email: user.email

            }

        });

    });

});

/* Add Note Route */
app.post("/add-note", authenticateToken, (req, res) => {

    const userId = req.user.id;
    const { title, content, category } = req.body;

    if (!title || !content) {
        return res.json({
            success: false,
            message: "All fields required"
        });
    }

    const sql = `
        INSERT INTO notes (user_id, title, content, category)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [userId, title, content, category],
        (err, result) => {

            if (err) {
                console.log("Add Note Database Error:", err);

                return res.json({
                    success: false,
                    message: "Database Error"
                });
            }

            res.json({
                success: true,
                message: "Note Added Successfully ✅"
            });

        }
    );

});

/* Get Notes Route */
app.get("/notes", authenticateToken, (req, res) => {

    const userId = req.user.id;

    const sql = `
    SELECT
    id,
    title,
    content,
    created_at,
    is_locked,
    pinned,
    IFNULL(category,'📘 Study') AS category
    FROM notes
    WHERE user_id=?
    ORDER BY pinned DESC, created_at DESC
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.json([]);
        }

        res.json(result);
    });

});

app.get("/profile", authenticateToken, (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            id,
            name,
            email,
            created_at
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {

            console.log("Profile Database Error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to load profile"
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.json({
            success: true,
            user: result[0]
        });

    });

});

app.get("/profile/stats", authenticateToken, (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT

            (SELECT COUNT(*)
             FROM notes
             WHERE user_id = ?) AS notesCreated,

            (SELECT COUNT(*)
             FROM user_topic_progress
             WHERE user_id = ?
             AND completed = TRUE) AS topicsCompleted,

            (SELECT COUNT(*)
             FROM user_bookmarks
             WHERE user_id = ?) AS bookmarksCount,

            (SELECT COUNT(*)
            FROM doubts
            WHERE user_id = ?) AS doubtsAsked
    `;

    db.query(
        sql,
        [userId, userId, userId, userId],
        (err, result) => {

            if (err) {

                console.log("Profile Stats Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to load statistics"
                });

            }

            res.json({

                success: true,

                stats: {

                    notesCreated:
                        result[0].notesCreated,

                    topicsCompleted:
                        result[0].topicsCompleted,

                    bookmarksCount:
                        result[0].bookmarksCount,

                    doubtsAsked:
                        result[0].doubtsAsked

                }

            });

        }
    );

});

app.get("/profile/progress", authenticateToken, (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            COUNT(*) AS completedTopics
        FROM user_topic_progress
        WHERE user_id = ?
        AND completed = TRUE
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {

            console.log("Profile Progress Error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to load learning progress"
            });

        }

        res.json({
            success: true,
            progress: {
                completedTopics: result[0].completedTopics
            }
        });

    });

});

app.post("/progress/complete", authenticateToken, (req, res) => {

    const userId = req.user.id;

    const { subjectId, topicId } = req.body;

    if (!subjectId || !topicId) {
        return res.status(400).json({
            success: false,
            message: "Subject ID and Topic ID are required"
        });
    }

    const sql = `
        INSERT INTO user_topic_progress
        (user_id, subject_id, topic_id, completed, completed_at)
        VALUES (?, ?, ?, TRUE, NOW())
        ON DUPLICATE KEY UPDATE
        completed = TRUE,
        completed_at = NOW()
    `;

    db.query(
        sql,
        [userId, subjectId, topicId],
        (err, result) => {

            if (err) {

                console.log("Progress Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to save topic progress"
                });

            }

            res.json({
                success: true,
                message: "Topic marked as completed"
            });

        }
    );

});

app.delete("/progress/incomplete", authenticateToken, (req, res) => {

    const userId = req.user.id;

    const { subjectId, topicId } = req.body;

    if (!subjectId || !topicId) {

        return res.status(400).json({
            success: false,
            message: "Subject ID and Topic ID are required"
        });

    }

    const sql = `
        DELETE FROM user_topic_progress
        WHERE user_id = ?
        AND subject_id = ?
        AND topic_id = ?
    `;

    db.query(
        sql,
        [userId, subjectId, topicId],
        (err, result) => {

            if (err) {

                console.log(
                    "Incomplete Progress Error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Failed to update learning progress"
                });

            }

            res.json({
                success: true,
                message: "Topic marked as incomplete"
            });

        }
    );

});

app.get("/progress", authenticateToken, (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            subject_id,
            topic_id,
            completed,
            completed_at
        FROM user_topic_progress
        WHERE user_id = ?
        AND completed = TRUE
        ORDER BY completed_at DESC
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {

            console.log("Progress Fetch Error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to load learning progress"
            });

        }

        console.log("PROGRESS DATABASE RESULT:", result);

        res.json({
            success: true,
            progress: result
        });

    });

});

app.post("/certificates/issue", authenticateToken, (req, res) => {

    const userId = req.user.id;
    const { subjectId } = req.body;

    if (!subjectId || !Object.prototype.hasOwnProperty.call(SUBJECT_TOPIC_COUNTS, subjectId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid subject ID."
        });
    }

    const requiredTopics = SUBJECT_TOPIC_COUNTS[subjectId];

    const checkCertificateSql = `
        SELECT certificate_id, issue_date
        FROM certificates
        WHERE user_id = ? AND subject_id = ?
    `;

    db.query(checkCertificateSql, [userId, subjectId], (err, existing) => {

        if (err) {
            console.error("Certificate Lookup Error:", err);
            return res.status(500).json({
                success: false,
                message: "Unable to check existing certificate."
            });
        }

        if (existing.length > 0) {
            return res.json({
                success: true,
                certificate: {
                    certificateId: existing[0].certificate_id,
                    issueDate: existing[0].issue_date
                }
            });
        }

        const progressSql = `
            SELECT topic_id
            FROM user_topic_progress
            WHERE user_id = ?
              AND subject_id = ?
              AND completed = TRUE
        `;

        db.query(progressSql, [userId, subjectId], (progressErr, rows) => {

            if (progressErr) {
                console.error("Certificate Progress Error:", progressErr);
                return res.status(500).json({
                    success: false,
                    message: "Unable to verify subject completion."
                });
            }

            const completedTopicIds = new Set(
                rows.map(row => row.topic_id)
            );

            if (completedTopicIds.size < requiredTopics) {
                return res.status(400).json({
                    success: false,
                    message: `Complete all ${requiredTopics} topics to receive this certificate.`
                });
            }

            const certificateId =
                "SHH-" +
                new Date().getFullYear() +
                "-" +
                crypto.randomBytes(4).toString("hex").toUpperCase();

            const issueDate = new Date().toISOString().slice(0, 10);

            const insertSql = `
                INSERT INTO certificates
                (user_id, subject_id, certificate_id, issue_date)
                VALUES (?, ?, ?, ?)
            `;

            db.query(
                insertSql,
                [userId, subjectId, certificateId, issueDate],
                (insertErr) => {

                    if (insertErr) {
                        console.error("Certificate Insert Error:", insertErr);

                        if (insertErr.code === "ER_DUP_ENTRY") {
                            return res.status(409).json({
                                success: false,
                                message: "A certificate already exists for this subject. Please reopen the certificate page."
                            });
                        }

                        return res.status(500).json({
                            success: false,
                            message: "Unable to save the certificate."
                        });
                    }

                    return res.status(201).json({
                        success: true,
                        certificate: {
                            certificateId,
                            issueDate
                        }
                    });

                }
            );

        });

    });

});

app.post("/bookmarks/add", authenticateToken, (req, res) => {

    const userId = req.user.id;

    const { subjectId, topicId } = req.body;

    if (!subjectId || !topicId) {
        return res.status(400).json({
            success: false,
            message: "Subject ID and Topic ID are required"
        });
    }

    const sql = `
        INSERT INTO user_bookmarks
        (user_id, subject_id, topic_id)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        id = id
    `;

    db.query(
        sql,
        [userId, subjectId, topicId],
        (err, result) => {

            if (err) {

                console.log("Bookmark Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to save bookmark"
                });

            }

            res.json({
                success: true,
                message: "Bookmark saved successfully"
            });

        }
    );

});

// ===============================
// POST NEW DOUBT
// ===============================

app.post("/doubts", authenticateToken, (req, res) => {

    const userId = req.user.id;

    const { subject, doubt } = req.body;

    if (!subject || !doubt) {
        return res.status(400).json({
            success: false,
            message: "Subject and doubt are required"
        });
    }

    const sql = `
        INSERT INTO doubts
        (user_id, subject, doubt)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [userId, subject, doubt],
        (err, result) => {

            if (err) {

                console.log("Doubt Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to save doubt"
                });

            }

            res.json({
                success: true,
                message: "Doubt posted successfully",
                doubtId: result.insertId
            });

        }
    );

});

/* Delete Note Route */
app.delete("/delete-note/:id", authenticateToken, (req, res) => {

    const noteId = req.params.id;
    const userId = req.user.id;

    const sql = `
        DELETE FROM notes
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [noteId, userId], (err, result) => {

        if (err) {
            console.log("Delete Note Database Error:", err);

            return res.json({
                success: false,
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.json({
                success: false,
                message: "Note not found or access denied."
            });
        }

        res.json({
            success: true,
            message: "Note Deleted Successfully ✅"
        });

    });

});


// =======================
// SERVER START
// =======================

app.post("/update-note", authenticateToken, (req, res) => {

    const { id, title, content } = req.body;
    const userId = req.user.id;

    if (!id || !title || !content) {
        return res.json({
            success: false,
            message: "All fields are required"
        });
    }

    const sql = `
        UPDATE notes
        SET title = ?, content = ?
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [title, content, id, userId],
        (err, result) => {

            if (err) {
                console.log("Update Note Database Error:", err);

                return res.json({
                    success: false,
                    message: "Update failed"
                });
            }

            if (result.affectedRows === 0) {
                return res.json({
                    success: false,
                    message: "Note not found or access denied."
                });
            }

            res.json({
                success: true,
                message: "Note Updated Successfully ✅"
            });

        }
    );

});

app.post("/pin-note", authenticateToken, (req, res) => {

    const { id, pinned } = req.body;
    const userId = req.user.id;

    if (!id) {
        return res.json({
            success: false,
            message: "Note ID is required"
        });
    }

    const sql = `
        UPDATE notes
        SET pinned = ?
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [pinned, id, userId],
        (err, result) => {

            if (err) {
                console.log("Pin Note Database Error:", err);

                return res.json({
                    success: false,
                    message: "Pin failed"
                });
            }

            if (result.affectedRows === 0) {
                return res.json({
                    success: false,
                    message: "Note not found or access denied."
                });
            }

            res.json({
                success: true,
                message: "Pinned updated ✅"
            });

        }
    );

});

app.post("/lock-note", authenticateToken, async (req, res) => {

    const { id, password } = req.body;
    const userId = req.user.id;

    if (!id || !password) {
        return res.json({
            success: false,
            message: "Note ID and password are required"
        });
    }

    try {

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("HASHED PASSWORD:", hashedPassword);

        const sql = `
            UPDATE notes
            SET is_locked = 1, note_password = ?
            WHERE id = ? AND user_id = ?
        `;

        db.query(
            sql,
            [hashedPassword, id, userId],
            (err, result) => {

                if (err) {
                    console.log("Lock Note Database Error:", err);

                    return res.json({
                        success: false,
                        message: "Lock failed"
                    });
                }

                if (result.affectedRows === 0) {
                    return res.json({
                        success: false,
                        message: "Note not found or access denied."
                    });
                }

                res.json({
                    success: true,
                    message: "Note Locked 🔒"
                });

            }
        );

    } catch (error) {

        console.log("Password Hashing Error:", error);

        res.json({
            success: false,
            message: "Failed to secure note"
        });
    }

});

app.post("/open-note", authenticateToken, (req, res) => {

    const { id, password } = req.body;
    const userId = req.user.id;

    if (!id || !password) {
        return res.json({
            success: false,
            message: "Note ID and password are required"
        });
    }

    const sql = `
        SELECT id, note_password
        FROM notes
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(
        sql,
        [id, userId],
        async (err, result) => {

            if (err) {
                console.log("Open Note Database Error:", err);

                return res.json({
                    success: false,
                    message: "Database error"
                });
            }

            if (result.length === 0) {
                return res.json({
                    success: false,
                    message: "Invalid password or access denied."
                });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                result[0].note_password
            );

            if (!isPasswordCorrect) {
                return res.json({
                    success: false,
                    message: "Invalid password or access denied."
                });
            }

            const unlockSql = `
                UPDATE notes
                SET is_locked = 0
                WHERE id = ? AND user_id = ?
            `;

            db.query(
                unlockSql,
                [id, userId],
                (unlockErr, unlockResult) => {

                    if (unlockErr) {
                        console.log(
                            "Unlock Note Database Error:",
                            unlockErr
                        );

                        return res.json({
                            success: false,
                            message: "Failed to unlock note"
                        });
                    }

                    res.json({
                        success: true,
                        message: "Note unlocked successfully 🔓"
                    });

                }
            );

        }
    );

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
