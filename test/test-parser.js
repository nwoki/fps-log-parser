var chai = require("chai");
var parser = require("../src/parser.js");

// var assert = chai.assert();
var should = chai.should();
var expect = chai.expect;

describe('Parser', function() {
    it('should extract info from a player JOIN', function() {
        let actionObj = parser.parse("  603:32 J;705473;4;Sbiego");

        actionObj.should.be.an("object");

        // property check
        actionObj.should.have.property("id");
        actionObj.should.have.property("guid");
        actionObj.should.have.property("name");
        actionObj.should.have.property("type");

        // value check
        expect(actionObj["id"]).to.equal("4");
        expect(actionObj["guid"]).to.equal("705473");
        expect(actionObj["name"]).to.equal("Sbiego");
        expect(actionObj["type"]).to.equal("J");
    });
    it('should extract info from a player KILL', function() {
        let actionObj = parser.parse("    598:46 K;929642;5;;Tegamen;705473;4;;Sbiego;m1garand_mp;135;MOD_HEAD_SHOT;head");

        actionObj.should.be.an("object");

        // property check
        actionObj.should.have.property("victim_guid");
        actionObj.should.have.property("victim_name");
        actionObj.should.have.property("killer_guid");
        actionObj.should.have.property("killer_name");
        actionObj.should.have.property("body_part");
        actionObj.should.have.property("type");

        // value check
        expect(actionObj["victim_guid"]).to.equal("929642");
        expect(actionObj["victim_name"]).to.equal("Tegamen");
        expect(actionObj["killer_guid"]).to.equal("705473");
        expect(actionObj["killer_name"]).to.equal("Sbiego");
        expect(actionObj["body_part"]).to.equal("head");
        expect(actionObj["type"]).to.equal("K");
    });
});
