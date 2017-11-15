module.exports = {
    parse: function(data) {
        // log file adds some extra whitespace we don't need
        var split = data.trim().split(" ");

        // first part is the server time. Second part is where we have all our information
        var actionSplit = split[1].split(";");
        var action = {};
        action.type = actionSplit[0];

        if (action.type == 'J') {
            // 603:32 J;705473;4;Sbiego
            action.guid = actionSplit[1];
            action.id = actionSplit[2];
            action.name = actionSplit[3];
        } else if (action.type == 'K') {
            // 598:46 K;929642;5;;Tegamen;705473;4;;Sbiego;m1garand_mp;135;MOD_HEAD_SHOT;head
            action.victim_guid = actionSplit[1];
            action.victim_name = actionSplit[4];
            action.killer_guid = actionSplit[5];
            action.killer_name = actionSplit[8];
            action.body_part = actionSplit[12];
        }

        return action;
    }
}
