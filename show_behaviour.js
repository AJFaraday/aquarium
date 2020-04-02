class ShowBehaviour {

  constructor(behaviour_name) {
    this.behaviour_name = behaviour_name;
    this.behaviour = new Behaviours[behaviour_name]();
    this.name = this.behaviour.name();
    document.getElementById('title').innerHTML = this.name;
    document.querySelector('title').innerHTML = this.name;

    var show = this;
    this.matches = match_data.filter(
      function(match) {
        return Object.keys(match.scores).some(
          function(score) {
            return score == show.name;
          }
        );
      }
    );
    this.matches = this.matches.sort(
      function(match, other) {
        var score_name = Object.keys(match.scores).filter(
          function(score) {
            return score == show.name;
          }
        )[0];
        var value = match.scores[score_name].average;

        var other_score_name = Object.keys(other.scores).filter(
          function(score) {
            return score == show.name;
          }
        )[0];
        var other_value = other.scores[other_score_name].average;
        return other_value - value;
      }
    );

    this.build_table();
  }

  build_table() {
    var show = this;
    this.table = document.getElementById('match_table');

    var table = document.createElement('table');

    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    ['Match', 'Score', 'Position'].forEach(
      function(header, index) {
        var th = document.createElement('th');
        th.innerHTML = header;
        if(index == 0) {
          th.setAttribute('colspan', 2);
        }
        tr.appendChild(th);
      }
    );
    thead.appendChild(tr);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    this.matches.forEach(
      function(match, index) {
        var tr = document.createElement('tr');
        var score_name = Object.keys(match.scores).filter(
          function(score) {
            return score == show.name;
          }
        )[0];
        var score = match.scores[score_name];

        var display_scores = Object.values(match.scores).map(
          function(score) {
            return (
              score.name + ': ' +
              score.total + '/' +
              score.snakes + ' = ' +
              score.average
            );
          }
        );

        var link = document.createElement('a');
        link.innerHTML = match.name;
        link.setAttribute('target', '_blank');
        link.setAttribute('title', display_scores.join('\n'));
        if(match.opponent) {
          link.href = 'config.html?config=' + match.config +
            '&snake=' + match.snake +
            '&opponent=' + match.opponent
        } else if(match.snake) {
          link.href = 'config.html?config=' + match.config +
            '&snake=' + match.snake
        } else {
          link.href = 'config.html?config=' + match.config
        }
        [
          (index + 1),
          link,
          score.average.toFixed(2),
          ((Object.keys(match.scores).indexOf(score_name) + 1) + '/' + Object.keys(match.scores).length)
        ].forEach(
          function(cell) {
            var td = document.createElement('td');
            if(typeof cell == 'object') {
              td.appendChild(cell);
            } else {
              td.innerHTML = cell;
            }
            tr.appendChild(td);
          }
        );
        tbody.appendChild(tr);
      }
    );
    table.appendChild(tbody);

    this.table.appendChild(table);
  }


}
