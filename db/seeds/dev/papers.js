
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('footnotes').del()
    .then(()=> knex('papers').del())// deletes all papers
    .then( () => {
        return Promise.all([
        // Inserts seed entries
        knex('papers').insert({ title: 'Fooo', author: 'Bob', publisher: 'Minnesota'},'id')
      .then(paper =>{
          return knex('footnotes').insert([
              { note: 'Lorem', paper_id: paper[0] },
              { note: 'Dolor', paper_id: paper[0] }
          ])
      })
            .then(()=> console.log(`Seeding Completed Successfully`) )
            .catch(error => console.error(`Error seeding the data ${error}`))
        ]) // end promise all
    })
      .catch(error => console.error(`Error seeding the data ${error} 2`))
};
