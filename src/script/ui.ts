// Import your Handlebars template
// @ts-ignore
import tableTemplate from '../templates/table.hbs';
import {calculate_fibonacci} from './fibonacci'


class Ui {
    button: HTMLButtonElement
    tableDiv: HTMLDivElement
    currentNum: number
    rows: number[][]

    constructor() {
        this.rows = []
        this.currentNum = 1
        this.button = document.getElementById('nextBtn') as HTMLButtonElement
        this.button.addEventListener('click', () => {

            const requestedNum = this.currentNum
            const startTs = Date.now();
            this.currentNum++

            console.log('clicked ' + requestedNum)
            calculate_fibonacci(requestedNum, (result) => {
                const endTs = Date.now();
                this.onNewResult(requestedNum, result, endTs - startTs)
            })
        })

        this.tableDiv = document.getElementById('results') as HTMLDivElement
    }

    onNewResult(num: number, result: number, elapsed: number) {
        console.log(`onNewResult(${num}, ${result}, ${elapsed})`)
        this.rows.push([
            num,
            result,
            elapsed
        ])
        this.setTable(this.rows)
    }

    setTable(data: number[][]) {
        this.tableDiv.innerHTML = tableTemplate({
            headers: ['Index', 'Result', 'Elapsed [ms]'],
            rows: data
        })
    }

    onImported() {
        console.log('imported')
    }
}

export const ui = new Ui();

