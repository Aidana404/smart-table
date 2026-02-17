import {createComparison, defaultRules} from "../lib/compare.js";

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {

    Object.keys(indexes)
        .forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName])
                    .map(name => {
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option;
                    })
            );
        });

    return (data, state, action) => {

        if (action && action.name === 'clear') {
            const fieldName = action.dataset.field;
            const parent = action.parentElement;
            const input = parent.querySelector('input, select');

            if (input) {
                input.value = '';
                state[fieldName] = '';
            }
        }

        const preparedState = { ...state };

        if (state.totalFrom || state.totalTo) {
            preparedState.total = [
                state.totalFrom ? Number(state.totalFrom) : undefined,
                state.totalTo ? Number(state.totalTo) : undefined
            ];
        }

        delete preparedState.totalFrom;
        delete preparedState.totalTo;

        return data.filter(row => compare(row, preparedState));
    }
}