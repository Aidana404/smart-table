import { createComparison, defaultRules } from "../lib/compare.js";

export function initFiltering(elements, indexes) {

    // @todo: #4.1 — заполнить выпадающие списки
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

        // @todo: #4.2 — очистить поля фильтров
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

    if ('totalFrom' in state || 'totalTo' in state) {
        preparedState.total = [state.totalFrom, state.totalTo];
        delete preparedState.totalFrom;
        delete preparedState.totalTo;
    }


        // @todo: #4.3 — создать функцию сравнения
        const compare = createComparison(defaultRules);

        // @todo: #4.5 — отфильтровать данные
        return data.filter(row => compare(row, state));
    }
}