function getTotalTopics() {

    let total = 0;

    Object.values(notesData).forEach(function(semester) {

        semester.subjects.forEach(function(subject) {

            total += subject.topics.length;

        });

    });

    return total;
}

document.addEventListener("DOMContentLoaded", async function () {

    const token = localStorage.getItem("token");

    // User must be logged in
    if (!token) {
        alert("Please login first.");
        window.location.href = "../auth/login.html";
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/profile", {
            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();

        console.log("PROFILE API RESPONSE:", data);

        // If authentication fails
        if (response.status === 401 || response.status === 403) {

            localStorage.removeItem("token");

            alert("Session expired. Please login again.");

            window.location.href = "../auth/login.html";

            return;
        }

        if (!data.success) {

            alert(data.message || "Failed to load profile.");

            return;
        }

        // Get user information from backend
        const user = data.user;

                // Load profile statistics
        const statsResponse = await fetch(
            "http://localhost:5000/profile/stats",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const statsData = await statsResponse.json();

        console.log("PROFILE STATS RESPONSE:", statsData);

        if (statsData.success) {

            document.getElementById("notesCreated").innerText =
                statsData.stats.notesCreated;

            document.getElementById("topicsCompleted").innerText =
                statsData.stats.topicsCompleted;

            document.getElementById("bookmarksCount").innerText =
                statsData.stats.bookmarksCount;

            document.getElementById("doubtsAsked").innerText =
                statsData.stats.doubtsAsked;

            const totalTopics = getTotalTopics();

            const progressResponse = await fetch(
                "http://localhost:5000/profile/progress",
                {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            const progressData = await progressResponse.json();

            console.log("PROFILE PROGRESS RESPONSE:", progressData);

            if (progressData.success) {

                const completedTopics =
                    progressData.progress.completedTopics;

                let percentage = 0;

                if (totalTopics > 0) {

                    percentage = Math.round(
                        (completedTopics / totalTopics) * 100
                    );

                }

                document.getElementById("overallProgress").innerText =
                    percentage + "%";

                document.getElementById("overallProgressBar").style.width =
                    percentage + "%";
            }

        }

        // Display name
        document.getElementById("profileName").innerText =
            user.name;

        document.getElementById("accountName").innerText =
            user.name;

        // Display email
        document.getElementById("profileEmail").innerText =
            user.email;

        document.getElementById("accountEmail").innerText =
            user.email;

    }
    catch (error) {

        console.error("PROFILE ERROR:", error);

        alert("Unable to connect to the server.");

    }

});