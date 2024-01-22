/* routes for invoices for biztime exercise app */

const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM invoices`);
    return res.json({ invoices: results.rows })
  } catch (e) {
    return next(e);
  }
})

router.get('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;

      const results = await db.query("SELECT i.id, i.amt, i.paid, i.add_date, i.paid_date, to_json(c) \"company\" FROM invoices i INNER JOIN companies c ON i.comp_code=c.code WHERE i.id = $1", [id]);
      if (results.rows.length === 0) {
        throw new ExpressError(`Can't find invoice id  ${id}`, 404);
      }

      return res.json({ invoice: results.rows[0] })
    } catch (e) {
      return next(e)
    }
  })
  
  router.post('/', async (req, res, next) => {
    try {
      const {comp_code,  amt} = req.body;
      console.log (req.body);
      console.log(`comp_code: ${comp_code}, amt: ${amt}`)
      const results = await db.query('INSERT INTO invoices (comp_code, amt, paid) VALUES ($1, $2, false) RETURNING id, comp_code, amt, paid, add_date, paid_date', [comp_code, amt]);
      return res.status(201).json({ invoice: results.rows[0] })
    } catch (e) {
      return next(e)
    }
  })

  router.put('/:id', async (req, res, next) => {
    try {
    
      const { id } = req.params;
      const { amt } = req.body;
      console.log(`id: ${id}, amt: ${amt}`)
      
     
      //const results = await db.query(my_query);

      //const results = await db.query(`UPDATE invoices SET amt=$1, paid=true, paid_date='${today}' WHERE id=$2 RETURNING id, comp_code, amt, paid, add_date, paid_date`, [amt, id]);
      const results = await db.query(`UPDATE invoices SET amt=$1, paid=true, paid_date=CURRENT_DATE WHERE id=$2 RETURNING id, comp_code, amt, paid, add_date, paid_date`, [amt, id]);

      if (results.rows.length === 0) {
        throw new ExpressError(`Can't update invoice with id of ${id}`, 404)
      }
      return res.send({ invoice: results.rows[0] })
    } catch (e) {
      return next(e)
    }
  })

  router.delete('/:id', async (req, res, next) => {
    try {
      const results = db.query('DELETE FROM invoices WHERE id = $1', [req.params.id])
      return res.send({ invoice: "DELETED!" })
    } catch (e) {
      return next(e)
    }
  })
  
  

module.exports = router;