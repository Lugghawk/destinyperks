var comments = $('.usertext > .usertext-body');

var replacePerks = function(element){

	for (var i = 0; i < perks.length; i++){
		var perk = perks[i];
		var perkRegex = new RegExp(perk.displayName, "gi");
		element.innerHTML = element.innerHTML.replace(perkRegex, perk.html);
	}
	return element;
};

$.each(comments, function(idx, comment){
	comment = replacePerks(comment);
});

