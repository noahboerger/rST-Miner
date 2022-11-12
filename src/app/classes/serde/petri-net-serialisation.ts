import {PetriNet} from "../models/petri-net/petri-net";
import {AbstractParser} from "../utility/abstract-parser";
import {BlockType} from "./block-type";
import {Transition} from "../models/petri-net/transition";
import {Place} from "../models/petri-net/place";
import {Arc} from "../models/petri-net/arc";

export function serialisePetriNet(net: PetriNet): string {
    return `${AbstractParser.TYPE_BLOCK} pn\n`
        + serialiseFrequency(net.frequency)
        + serialiseTransitions(net.getTransitions())
        + serialisePlaces(net.getPlaces())
        + serialiseArcs(net.getArcs());
}

function serialiseFrequency(frequency: number | undefined): string {
    if (frequency === undefined) {
        return '';
    }
    return `${BlockType.FREQUENCY} ${frequency}\n`;
}

function serialiseTransitions(transitions: Array<Transition>): string {
    let result = `${BlockType.TRANSITIONS}\n`;
    transitions.forEach(t => {
        result += `${removeSpaces(t.getId(), t.getId())} ${removeSpaces(t.label ?? '', t.getId())}\n`;
    });
    return result;
}

function serialisePlaces(places: Array<Place>): string {
    let result = `${BlockType.PLACES}\n`;
    places.forEach(p => {
        result += `${removeSpaces(p.getId(), p.getId())} ${p.marking}\n`;
    });
    return result;
}

function serialiseArcs(arcs: Array<Arc>): string {
    let result = `${BlockType.ARCS}\n`;
    arcs.forEach(a => {
        result += `${removeSpaces(a.sourceId, a.getId())} ${removeSpaces(a.destinationId, a.getId())}`;
        if (a.weight > 1) {
            result += ` ${a.weight}`;
        }
        result += '\n';
    });
    return result;
}

function removeSpaces(str: string, id: string): string {
    if (str.includes(' ')) {
        console.warn(`Petri net element with id '${id}' contains a spaces in its definition! Replacing spaces with underscores, no uniqueness check is performed!`)
        return str.replace(/ /g, '_');
    } else {
        return str;
    }
}
