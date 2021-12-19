(function(){
	var radius = 30;
	var circleRadius = 20;
	var controlPointDistance = 25;
	var verticalScale = 0.7;
	var transformY = function(y){return 50 - verticalScale * (50 - y);}

	var firstArcStartX = 50 + radius;
	var firstArcEndX = firstArcStartX - circleRadius * (1 - 1/Math.sqrt(2));
	var firstArcEndY = transformY(50 - circleRadius / Math.sqrt(2));

	var secondArcEndX = 50 - radius;
	var secondArcStartX = secondArcEndX + circleRadius * (1 - 1/Math.sqrt(2));
	var secondArcStartY = transformY(50 + circleRadius / Math.sqrt(2));

	var firstControlPointX = firstArcEndX - controlPointDistance / Math.sqrt(2);
	var firstControlPointY = transformY(firstArcEndY - controlPointDistance / Math.sqrt(2));
	var secondControlPointX = secondArcStartX + controlPointDistance / Math.sqrt(2);
	var secondControlPointY = transformY(secondArcStartY + controlPointDistance / Math.sqrt(2));

	console.log(`M ${firstArcStartX} 50 A ${circleRadius} ${circleRadius * verticalScale} 0 0 0 ${firstArcEndX} ${firstArcEndY} C ${firstControlPointX} ${firstControlPointY} ${secondControlPointX} ${secondControlPointY} ${secondArcStartX} ${secondArcStartY} A ${circleRadius} ${circleRadius * verticalScale} 0 0 1 ${secondArcEndX} 50`)
})()