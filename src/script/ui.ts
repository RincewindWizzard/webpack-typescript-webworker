import * as Handlebars from 'handlebars/runtime'; // Import Handlebars runtime
// Import your Handlebars template
// @ts-ignore
import tableTemplate from '../templates/table.hbs';



class Ui {
    button: HTMLButtonElement
    tableDiv: HTMLDivElement

    constructor() {
        this.button = document.getElementById('nextBtn') as HTMLButtonElement
        this.button.addEventListener('click', () => {
            console.log('Button clicked')
        })

        this.tableDiv = document.getElementById('results') as HTMLDivElement
    }

    setTable(data: number[][]) {
        console.log(data)
        this.tableDiv.innerHTML = tableTemplate({
            headers: ['Index', 'Result', 'Elapsed [ms]'],
            rows: data
        })
    }
}

export const ui = new Ui();

