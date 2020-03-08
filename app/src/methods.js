export const getMapData = (model, month, year) => {
    fetch(`https://localhost:5000/api/data?model=${model}&year=${year}&month=${month}`)
        .then(res => this.setState({data: res}));
}