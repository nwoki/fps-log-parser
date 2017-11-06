/**
 592:07 J;185269;5;^2|OCG|^1UnDead
 
 S erver Time:	592:07
 Type:	J
 GUID:	185269
 Client ID:	5
 Client Name:	^2|OCG|^1UnDead
 */

/**
 * PARSED OBJ
 * 
 * - type (join (J)/quit (Q)/kill (K)/death (D)/chat (say))
 * 
 * # J
 * - guid
 * - id
 * - name
 */

module.exports = {
    parse: function(data) {
        var split = data.split(" ");

        // first part is the server time. Second part is where we have all our information
        var actionSplit = split[1].split(";");
        console.log(actionSplit);

        var action = {};
        action.type = actionSplit[0];

        if (actionSplit[0] == 'J') {
            action.guid = actionSplit[1];
            action.id = actionSplit[2];
            action.name = actionSplit[3];
        } else if (actionSplit[0] == 'K') {
            // 598:46 K;929642;5;;Tegamen;705473;4;;Sbiego;m1garand_mp;135;MOD_HEAD_SHOT;head
            action.victimGuid = actionSplit[1];
            action.victimName = actionSplit[4];
            action.killerGuid = actionSplit[5];
            action.killerName = actionSplit[8];
            action.headShot = actionSplit[11] == "MOD_HEAD_SHOT" ? true: false;
        }

        return action;
    }
}
