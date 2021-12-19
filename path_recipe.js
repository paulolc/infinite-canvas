(function(){
	var radius = 30;
	var circleRadius = 20;
	var controlPointDistance = 25;
	var verticalScale = 0.7;
	var transformY = function(y){return 50 - verticalScale * (50 - y);}

	var leftArcEndX = 50 - radius + circleRadius * (1 - 1/Math.sqrt(2));
	var rightArcEndX = 50 + radius - circleRadius * (1 - 1/Math.sqrt(2));
	var arcEndYTop = transformY(50 - circleRadius / Math.sqrt(2));
	var arcEndYBottom = transformY(50 + circleRadius / Math.sqrt(2));


	var firstControlPointX = rightArcEndX - controlPointDistance / Math.sqrt(2);
	var firstControlPointY = transformY(arcEndYTop - controlPointDistance / Math.sqrt(2));
	var secondControlPointX = leftArcEndX + controlPointDistance / Math.sqrt(2);
	var secondControlPointY = transformY(arcEndYBottom + controlPointDistance / Math.sqrt(2));

	// console.log(`M ${firstArcStartX} 50 A ${circleRadius} ${circleRadius * verticalScale} 0 0 0 ${firstArcEndX} ${firstArcEndY} C ${firstControlPointX} ${firstControlPointY} ${secondControlPointX} ${secondControlPointY} ${secondArcStartX} ${secondArcStartY} A ${circleRadius} ${circleRadius * verticalScale} 0 0 1 ${secondArcEndX} 50`)
	console.log(`M${rightArcEndX} ${arcEndYBottom} A ${circleRadius} ${circleRadius * verticalScale} 0 0 0 ${rightArcEndX} ${arcEndYTop} C ${firstControlPointX} ${firstControlPointY} ${secondControlPointX} ${secondControlPointY} ${leftArcEndX} ${arcEndYBottom}`)
})()