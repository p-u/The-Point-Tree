const suffixes = ["None", "Good", "Great", "Better", "Excellent", "Terrific", "Superb", "Awesome", "Amazing", "Fantastic", "Incredible", "Outstanding", "Insane", "Perfection", "Holy", "Angelic", "Demonic", "Godly", "Divine", "Penultimate", "Supreme", "Maxima", "Cosmic", "Transcended", "Celestial", "Absolute", "Insanity", "Unfathomable", "Awakened", "Unbound", "Singularity"]
const suffixcutoff = [0, 1, 3, 6, 9, 12, 15, 20, 25, 30, 36, 45, 55, 64, 80, 90, 100, 120, 135, 150, 175, 200, 220, 250, 285, 320, 380, 450, 500, 600, 750, 1e99]
const suffixColors = ["#9E9E9E","#4CAF50","#2ECC71","#00c889","#00BCD4","#2196F3","#3F51B5","#673AB7","#9C27B0","#E91E63","#F44336","#FF5722","#FF9800","#FFC107","#FFE082","#FFF176","#8B0000","#FFD700","#F8F8FF","#00E5FF","#FF00FF","#7CFC00","#6A0DAD","#40E0D0","#87CEFA","#4e4e4e", "#FF4500", "#9400D3", "#00FFCC", "#FF1493", "#eb8911"]

function rankName(num) {
    if (num === undefined) num = player.m.ranks.rid
    while (num < suffixcutoff[player.m.ranks.suffixid]) player.m.ranks.suffixid = player.m.ranks.suffixid - 1
    while (num >= suffixcutoff[player.m.ranks.suffixid+1]) player.m.ranks.suffixid = player.m.ranks.suffixid + 1
    if (num == 0) {
        return "None"
    } else {
        return `<span style="font-weight:bold;color:${suffixColors[player.m.ranks.suffixid]}">${suffixes[player.m.ranks.suffixid]} ${num - suffixcutoff[player.m.ranks.suffixid] + 1}</span>`
    }
}