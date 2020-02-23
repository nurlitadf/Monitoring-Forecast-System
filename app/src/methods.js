export const handleSubmit = (model, month, year) => {
    fetch(`http://localhost:5000/api/data?model=${model}&year=${year}&month=${month}`)
        .then(res => this.setState({ data: res }));
}