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
        }

        return action;
    }
}
