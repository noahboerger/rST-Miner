export enum StandardProcessModelNetType {
    REPAIR_EXAMPLE,
    USER_DEFINED,
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
    }
}

export function getStandardModelFromNetString(
    netString: string
): StandardProcessModelNetType {
    switch (netString) {
        case REPAIR_EXAMPLE_NET_STRING:
            return StandardProcessModelNetType.REPAIR_EXAMPLE;
        default:
            return StandardProcessModelNetType.USER_DEFINED;
    }
}
