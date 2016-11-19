SkiList = React.createClass({
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
