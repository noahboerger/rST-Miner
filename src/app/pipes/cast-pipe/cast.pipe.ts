import { Pipe, PipeTransform } from '@angular/core';


/**
 * Cast super type into type using generics
 * Return Type obtained by optional @param type OR assignment type.
 */

@Pipe({ name: 'cast' })
export class CastPipe implements PipeTransform {
    /**
     * Cast (S: SuperType) into (T: Type) using @Generics.
     * @param value (S: SuperType) obtained from input type.
     * @param type (T: CastingType) given
     * @optional @param type (T CastingType)
     * type?: { new (): T }
     * type?: new () => T
     */
    transform<S, T extends S>(value: S, type?: new () => T): T {
        return <T>value;
    }
}