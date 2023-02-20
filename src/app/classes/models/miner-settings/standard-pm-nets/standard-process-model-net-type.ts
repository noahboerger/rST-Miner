export enum StandardProcessModelNetType {
    REPAIR_EXAMPLE,
    USER_DEFINED,
    REVIEWING_EXAMPLE,
}

const REPAIR_EXAMPLE_NET_STRING =
    '.type pn\n' +
    '.transitions\n' +
    'Register Register\n' +
    'AnalyzeDefect AnalyzeDefect\n' +
    'InformUser InformUser\n' +
    'RepairComplex RepairComplex\n' +
    'TestRepair TestRepair\n' +
    'ArchiveRepair ArchiveRepair\n' +
    'RepairSimple RepairSimple\n' +
    'RestartRepair RestartRepair\n' +
    '.places\n' +
    'p0 0\n' +
    'p1 0\n' +
    'p2 0\n' +
    'p3 0\n' +
    'p4 0\n' +
    'p5 0\n' +
    '.arcs\n' +
    'InformUser p0\n' +
    'p0 ArchiveRepair\n' +
    'AnalyzeDefect p1\n' +
    'p1 InformUser\n' +
    'Register p2\n' +
    'p2 AnalyzeDefect\n' +
    'TestRepair p3\n' +
    'p3 ArchiveRepair\n' +
    'p3 RestartRepair\n' +
    'RepairComplex p4\n' +
    'RepairSimple p4\n' +
    'p4 TestRepair\n' +
    'AnalyzeDefect p5\n' +
    'RestartRepair p5\n' +
    'p5 RepairComplex\n' +
    'p5 RepairSimple';

const REVIEWING_EXAMPLE_NET_STRING =
    '.type.pn\n' +
    '.places\n' +
    'p1 0\n' +
    'p2 0\n' +
    'p3 0\n' +
    'p4 0\n' +
    'p5 0\n' +
    'p6 0\n' +
    'p7 0\n' +
    'p8 0\n' +
    'p9 0\n' +
    '.transitions\n' +
    'inviteReviewers inviteReviewers\n' +
    'getReview1 getReview1\n' +
    'getReview2 getReview2\n' +
    'getReview3 getReview3\n' +
    'timeOut1 timeOut1\n' +
    'timeOut2 timeOut2\n' +
    'timeOut3 timeOut3\n' +
    'collectReviews collectReviews\n' +
    'decide decide\n' +
    'inviteAdditionalReviewer inviteAdditionalReviewer\n' +
    'timeOutX timeOutX\n' +
    'getReviewX getReviewX\n' +
    'accept accept\n' +
    'reject reject\n' +
    '.arcs\n' +
    'inviteReviewers p1\n' +
    'p1 getReview1\n' +
    'p1 timeOut1\n' +
    'inviteReviewers p2\n' +
    'p2 timeOut2\n' +
    'p2 getReview2\n' +
    'inviteReviewers p3\n' +
    'p3 getReview3\n' +
    'p3 timeOut3\n' +
    'timeOut1 p4\n' +
    'getReview1 p4\n' +
    'p4 collectReviews\n' +
    'getReview2 p5\n' +
    'timeOut2 p5\n' +
    'p5 collectReviews\n' +
    'timeOut3 p6\n' +
    'getReview3 p6\n' +
    'p6 collectReviews\n' +
    'collectReviews p7\n' +
    'getReviewX p7\n' +
    'timeOutX p7\n' +
    'p7 decide\n' +
    'inviteAdditionalReviewer p8\n' +
    'p8 getReviewX\n' +
    'p8 timeOutX\n' +
    'decide p9\n' +
    'p9 accept\n' +
    'p9 inviteAdditionalReviewer\n' +
    'p9 reject';

const EMPTY_USER_DEFINED_NET =
    '.type pn\n' + '.transitions\n' + '.places\n' + '.arcs';

export function allStandardProcessModelNetTypeEnumValues(): Array<StandardProcessModelNetType> {
    return Object.values(StandardProcessModelNetType)
        .filter(v => isNaN(Number(v)))
        .map(v => (<any>StandardProcessModelNetType)[v]);
}

export function toString(
    standardProcessModelNet: StandardProcessModelNetType
): string {
    switch (standardProcessModelNet) {
        case StandardProcessModelNetType.REPAIR_EXAMPLE:
            return 'Repair Example';
        case StandardProcessModelNetType.USER_DEFINED:
            return 'User Defined';
        case StandardProcessModelNetType.REVIEWING_EXAMPLE:
            return 'Reviewing Example';
    }
}

export function fromString(value: string): StandardProcessModelNetType {
    for (const standardProcessModelNetType of allStandardProcessModelNetTypeEnumValues()) {
        if (toString(standardProcessModelNetType) === value) {
            return standardProcessModelNetType;
        }
    }
    throw new Error('Enum Item is unknown!');
}

export function getKnowPetriNetString(
    standardProcessModelNet: StandardProcessModelNetType
): string {
    switch (standardProcessModelNet) {
        case StandardProcessModelNetType.REPAIR_EXAMPLE:
            return REPAIR_EXAMPLE_NET_STRING;
        case StandardProcessModelNetType.USER_DEFINED:
            return EMPTY_USER_DEFINED_NET;
        case StandardProcessModelNetType.REVIEWING_EXAMPLE:
            return REVIEWING_EXAMPLE_NET_STRING;
    }
}

export function getStandardModelFromNetString(
    netString: string
): StandardProcessModelNetType {
    switch (netString) {
        case REPAIR_EXAMPLE_NET_STRING:
            return StandardProcessModelNetType.REPAIR_EXAMPLE;
        case REVIEWING_EXAMPLE_NET_STRING:
            return StandardProcessModelNetType.REVIEWING_EXAMPLE;
        default:
            return StandardProcessModelNetType.USER_DEFINED;
    }
}
