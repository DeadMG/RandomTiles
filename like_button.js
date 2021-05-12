'use strict';

const dom = ReactDOMFactories;
const width = 12;
const height = 4;

const RandomTiles = React.createFactory(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { generated: false, settings: { probability: 0.5 } };
    }

    render() {
        return dom.div({},
            this.renderSettings(),
            this.renderGenerate(),
            this.renderBoard());
    }
    
    renderSettings() {
        return dom.div({},
            dom.label({},
                "Probability",
                dom.input({ 
                    type: "number", 
                    value: this.state.settings.probability, 
                    onChange: value => this.setState({ settings: { probability: parseFloat(event.target.value) } }) 
                })));
    }
    
    renderGenerate() {
        return dom.button({ onClick: () => this.generate() }, "Generate");
    }
    
    renderBoard() {
        if (!this.state.generated) return null;
        
        return dom.div({},
            ...this.state.board.map(row => this.renderRow(row)));
    }
    
    renderRow(row) {
        return dom.div({ style: { display: "flex" } },
            ...row.map(tile => this.renderTile(tile)));
    }
    
    renderTile(tile) {
        return dom.div({ style: { height: 40, width: 40, border: "1px solid black", backgroundColor: tile ? "red" : "white" } });
    }
    
    generate() {
        this.setState({ generated: true, board: this.generatePerTileBoard(this.state.settings.probability) });
    }
    
    generatePerTileBoard(probability) {
        var board = [];
        for (var i = 0; i < height; i++) {
            var row = [];
            for (var j = 0; j < width; j++) {
                row.push(Math.random() > probability);
            }
            board.push(row);
        }
        return board;
    }
});

ReactDOM.render(RandomTiles(), document.querySelector('#like_button_container'));