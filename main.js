var comments = $('.usertext > .usertext-body');

var replacePerks = function(element){

	for (var i = 0; i < perks.length; i++){
		var perk = perks[i];
		element.innerHTML = element.innerHTML.replace(perk.displayName, '<span title="'+perk.displayDescription+'" class="destinyperk">'+perk.displayName+'</span>');
	}
	return element;
};

$.each(comments, function(idx, comment){
	comment = replacePerks(comment);
});

