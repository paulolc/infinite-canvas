import { Area } from "./area";
import { ConvexPolygon } from "./polygons/convex-polygon";
import { Point } from "../geometry/point";
import { Transformation } from "../transformation";
import { LineSegment } from "./line/line-segment";
import { Ray } from "./line/ray";
import { Line } from "./line/line";
declare class Plane implements Area {
    expandToIncludePoint(point: Point): Area;
    expandToIncludePolygon(polygon: ConvexPolygon): Area;
    expandToIncludeInfinityInDirection(direction: Point): Area;
    intersects(area: Area): boolean;
    expandToInclude(area: Area): Area;
    transform(transformation: Transformation): Area;
    intersectWithLineSegment(other: LineSegment): Area;
    contains(other: Area): boolean;
    intersectWith(area: Area): Area;
    intersectWithRay(ray: Ray): Area;
    intersectWithLine(line: Line): Area;
    intersectWithConvexPolygon(convexPolygon: ConvexPolygon): Area;
    isContainedByRay(ray: Ray): boolean;
    isContainedByLineSegment(other: LineSegment): boolean;
    isContainedByLine(line: Line): boolean;
    isContainedByConvexPolygon(other: ConvexPolygon): boolean;
    intersectsRay(ray: Ray): boolean;
    intersectsLineSegment(lineSegment: LineSegment): boolean;
    intersectsLine(line: Line): boolean;
    intersectsConvexPolygon(other: ConvexPolygon): boolean;
}
export declare const plane: Plane;
export {};