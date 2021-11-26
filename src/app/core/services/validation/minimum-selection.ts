import { FormArray, ValidatorFn } from '@angular/forms';

export function minimumSelection(minimum = 1): ValidatorFn {
    return (controls: FormArray) => {
        if (!controls || !controls.controls) {
            return null;
        }

        const totalSelected = controls.controls
            .map(control => control.value)
            .reduce((prev, next) => (next ? prev + next : prev), 0);
        // if the total is not greater than the minimum, return the error message
        return totalSelected < minimum ? { minSelection: true } : null;
    };
}