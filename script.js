let votes = JSON.parse(localStorage.getItem("votes")) || {
    "Candidate A": 0,
    "Candidate B": 0,
    "Candidate C": 0
};

let votedUsers = JSON.parse(localStorage.getItem("votedUsers")) || [];

updateResults();

function verifyVoter() {
    const voterId = document.getElementById("voterId").value.trim();
    const msg = document.getElementById("loginMsg");

    if (voterId === "") {
        msg.innerText = "Please enter Voter ID.";
        msg.style.color = "red";
        return;
    }

    if (votedUsers.includes(voterId)) {
        msg.innerText = "You have already voted!";
        msg.style.color = "red";
        return;
    }

    msg.innerText = "Verified! You may vote.";
    msg.style.color = "green";

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("voteBox").classList.remove("hidden");

    localStorage.setItem("currentVoter", voterId);
}

function castVote(candidate) {
    const voterId = localStorage.getItem("currentVoter");

    if (!voterId) return;

    votes[candidate]++;
    votedUsers.push(voterId);

    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("votedUsers", JSON.stringify(votedUsers));
    localStorage.removeItem("currentVoter");

    document.getElementById("voteMsg").innerText = 
        "Vote cast successfully!";
    document.getElementById("voteMsg").style.color = "green";

    updateResults();

    setTimeout(() => {
        location.reload();
    }, 1500);
}

function updateResults() {
    let total = votes["Candidate A"] + votes["Candidate B"] + votes["Candidate C"];

    document.getElementById("barA").style.width =
        total ? (votes["Candidate A"] / total * 100) + "%" : "0%";

    document.getElementById("barB").style.width =
        total ? (votes["Candidate B"] / total * 100) + "%" : "0%";

    document.getElementById("barC").style.width =
        total ? (votes["Candidate C"] / total * 100) + "%" : "0%";
}

function resetSystem() {
    if (confirm("Are you sure you want to reset the election?")) {
        localStorage.clear();
        location.reload();
    }
}
