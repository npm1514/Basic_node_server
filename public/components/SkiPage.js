SkiPage = React.createClass({
  getSkis: function(){
    $.ajax({
      method: "GET",
      url: "/data",
      success: function(response){
        this.setState({listOfSkis: response});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  postSki: function(){
    var newSki = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image
    };
    $.ajax({
      method: "POST",
      url: "/data",
      data: newSki,
      success: function(response){
        this.getSkis();
      }.bind(this),
      error: function(xhr, status, err){
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  updateNewSkiName: function(e){
    this.setState({
      name: e.target.value
    });
  },
  updateNewSkiDescription: function(e){
    this.setState({
      description: e.target.value
    });
  },
  updateNewSkiImage: function(e){
    this.setState({
      image: e.target.value
    });
  },
  componentDidMount: function(){
    this.getSkis();
  },
  getInitialState: function(){
    return {
      listOfSkis: [],
      name: "",
      description: "",
      image: ""
    };
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.postSki}>
          <input onChange={this.updateNewSkiName} type="text" placeholder="Name of Skis"/>
          <input onChange={this.updateNewSkiDescription} type="text" placeholder="Ski Description"/>
          <input onChange={this.updateNewSkiImage} type="text" placeholder="Image URL"/>
          <button type="submit">Add New Ski</button>
        </form>
        <SkiList skiData={this.state.listOfSkis} getSkis={this.getSkis}/>
      </div>
    );
  }
});
