const Database = require('../database');


const db = new Database;

class SalasModel{
        constructor({sal_id =null,sal_tipo = '', sal_nome = '', sal_andar = '',sal_cap = null, sal_obs = ''}= {}){
            this.sal_id = sal_id;
            this.sal_tipo = sal_tipo;
            this.sal_nome = sal_nome;
            this.sal_andar = sal_andar;
            this.sal_cap = sal_cap;
            this.sal_obs = sal_obs;
        }

        static async ObterTodos() {
            const sql = `SELECT * FROM salas`;
            const results = await db.executaComando(sql);
            return results.map(row => new SalasModel(row));
        }
    
        static async Inserir(sala) {
            const sql = `
                INSERT INTO salas (sal_tipo, sal_nome, sal_andar, sal_cap, sal_obs)
                VALUES (?, ?, ?, ?, ?)
            `;
            const params = [sala.sal_tipo, sala.sal_nome, sala.sal_andar, sala.sal_cap, sala.sal_obs];
            const result = await db.executaComandoNonQuery(sql, params);
            sala.sal_id = result.insertId;
            return sala;
        }
    
        static async Atualizar(sala) {
            const sql = `
                UPDATE salas
                SET sal_tipo = ?, sal_nome = ?, sal_andar = ?, sal_cap = ?, sal_obs = ?
                WHERE sal_id = ?
            `;
            const params = [sala.sal_tipo, sala.sal_nome, sala.sal_andar, sala.sal_cap, sala.sal_obs, sala.sal_id];
            const result = await db.executaComandoNonQuery(sql, params);
            return result.affectedRows > 0;
        }
    
        static async Excluir(sal_id) {
            const sql = `DELETE FROM salas WHERE sal_id = ?`;
            const result = await db.executaComandoNonQuery(sql, [sal_id]);
            return result.affectedRows > 0;
        }
    }
    
    module.exports = SalasModel;