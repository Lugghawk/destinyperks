var sqlite_to_json = require('sqlite-to-json');
var sqlite3 = require('sqlite3');
var underscore = require('underscore');
var fs = require('fs');

var exporter = new sqlite_to_json({client: new sqlite3.Database('world_sql_content_05feb511d99733ad8d1bbe60465007c1.content')});

exporter.save('DestinySandboxPerkDefinition', './perks.json', function(err){ 
	if (err) {
		console.log("Couldn't save to perks.json " + err); 
		return;
	}
	var perks = require('./perks.json');

	perks = underscore.map(perks, function(perk){
		perk = JSON.parse(perk.json);
		var minimalPerk = {
			displayName: perk.displayName,
			displayDescription: perk.displayDescription,
			displayIcon: perk.displayIcon,
			html: '<span class="destinyperk" title="'+perk.displayDescription+'">'+perk.displayName+'</span>'
		}
		return minimalPerk;
	});
	perks = underscore.reject(perks, function(perk){
		return perk.displayName === undefined;
	});

	fs.writeFile('perks.json', 'window.perks =' + JSON.stringify(perks));
});

