var OneSki = React.createClass({
  deleteSki: function(){
    var id = this.props.id;
    $.ajax({
      method: "DELETE",
      url: "/data/" + id,
      success: function(response){
        this.props.getSkis();
      }.bind(this),
      error: function(xhr, status, err){
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  putSki: function(){
    var id = this.props.id;
    var updatedSki = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image
    };
    $.ajax({
      method: "PUT",
      url: "/data/" + id,
      data: updatedSki,
      success: function(response){
        this.props.getSkis();
      }.bind(this),
      error: function(xhr, status, err){
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  changeName: function(e){
    this.setState({
      name: e.target.value
    })
  },
  changeDescription: function(e){
    this.setState({
      description: e.target.value
    })
  },
  changeImage: function(e){
    this.setState({
      image: e.target.value
    })
  },
  updateSki: function(){
    this.setState({
      view:
      <div key={this.props.id}>
        <form onSubmit={this.putSki}>
          <input placeholder={this.props.name} onChange={this.changeName}/>
          <input placeholder={this.props.description} onChange={this.changeDescription}/>
          <input placeholder={this.props.image} onChange={this.changeImage}/>
          <img src={this.state.image}/>
          <button type="submit">Submit Change</button>
        </form>
        </div>

    })
  },
  getInitialState: function(){
    return {
      view:
      <div key={this.props.id}>
        <h1>{this.props.name}</h1>
        <img src={this.props.image}/>
        <p>{this.props.description}</p>
        <button onClick={this.deleteSki}>DELETE THIS SKI</button><br/>
        <button onClick={this.updateSki}>UPDATE THIS</button>
      </div>,
      name: this.props.name,
      description: this.props.description,
      image: this.props.image
    }
  },
  render: function(){
    return (
      <div>
        {this.state.view}
      </div>
    );
  }
});

var SkiList = React.createClass({
  render: function(){
    var self = this;
    var skiNodes = this.props.skiData.map(function(ski){
      return(
        <OneSki
          key={ski._id}
          id={ski._id}
          name={ski.name}
          description={ski.description}
          image={ski.image}
          getSkis={self.props.getSkis}
        />
      );
    })
    return (
      <div>
        {skiNodes}
      </div>
    );
  }
});

var SkiPage = React.createClass({
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

ReactDOM.render(
  <SkiPage/>,
  document.getElementById('content')
);
