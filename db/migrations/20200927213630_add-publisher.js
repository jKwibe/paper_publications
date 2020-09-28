
exports.up = async function(knex) {
  return Promise.all([
      knex.schema.table('papers', (table)=>{
          table.string('publisher');
      })
  ]);
};

exports.down = async function(knex) {
  return Promise.all([
      knex.schema.table('papers', (table)=>{
          table.dropColumn('publisher')
      })
  ]);
};
