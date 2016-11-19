OneSki = React.createClass({
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
