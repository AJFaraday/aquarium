class ShowBehaviour {

  constructor(behaviour_name) {
    this.behaviour_name = behaviour_name;
    this.behaviour = new Behaviours[behaviour_name]();
    this.name = this.behaviour.name();
    document.getElementById('title').innerHTML = this.name;

    var show = this;
    this.matches = match_data.filter(
      function (match) {
        return Object.keys(match.scores).some(
          function (score) {
            return score == show.name;
          }
        );
      }
    );
    this.matches = this.matches.sort(
      function (match, other) {
        var score_name = Object.keys(match.scores).filter(
          function (score) {
            return score == show.name;
          }
        )[0];
        var value = match.scores[score_name].average;

        var other_score_name = Object.keys(other.scores).filter(
          function (score) {
            return score == show.name;
          }
        )[0];
        var other_value = other.scores[score_name].average;
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
      function (header) {
        var th = document.createElement('th');
        th.innerHTML = header;
        tr.appendChild(th);
      }
    );
    thead.appendChild(tr);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    this.matches.forEach(
      function (match) {
        var tr = document.createElement('tr');
        var score_name = Object.keys(match.scores).filter(
          function (score) {
            return score == show.name;
          }
        )[0];
        var score = match.scores[score_name];
        [
          match.name,
          score.average.toFixed(2),
          ((Object.keys(match.scores).indexOf(score_name) + 1) + '/' + Object.keys(match.scores).length)
        ].forEach( // TODO these, all of these
          function (cell) {
            var td = document.createElement('td');
            td.innerHTML = cell;
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
