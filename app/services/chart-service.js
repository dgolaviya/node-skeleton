import RegantRefrigerator from '../models/RegantRefrigerator';
import { validateCreateRegantChartInput, validateCreateMonthChartInput } from '../validation/create-chart';
import debug from "debug";
import CustomError from '../validation/custom-error';
import MonthlyLog from '../models/MonthlyLog';

const logger = debug('user-auth-app:chart-service:');

const createRegantChart = async (req, res) => {
    try{
        const { errors, isValid } = validateCreateRegantChartInput(req.body);
        if (!isValid) {
            throw new CustomError(400, 'Input not valid', errors);
        }
        const chart = await RegantRefrigerator.findOne({ "name" : req.body.name, "month" : req.body.month, "year" : req.body.year });
        if (chart) {
            throw new CustomError(404, 'This month chart already exists');
        }
        let dataCollections = {};
        for(let i = 1 ; i <= 31 ; i++)
        {
            dataCollections[i] = {
                'day' : i,
                'chart': "",
                'upper': "",
                'lower': "",
                'digital': "",
                'batCheck': false,
                'au': "",
                'userId': ""
            }
        }
        const regantRefrigerator = new RegantRefrigerator({
            name: req.body.name,
            serialNo: req.body.serialNo,
            range: req.body.range,
            month: req.body.month,
            year: req.body.year,
            dataCollection: dataCollections
          });
        
        const regantRefrigeratorData = await regantRefrigerator.save();
        res.status(200).json(regantRefrigeratorData);
    }
    catch (err) {
        logger(err);
        res.status(500).send(err);
        }
    }
    const updateRegantChart = async (req, res) => {
        const chartDB = await RegantRefrigerator.findOne({ "name" : req.body.name, "month" : req.body.month, "year" : req.body.year, "serialNo" : req.body.serialNo });
        if (!chartDB) {
            throw new CustomError(404, 'This Chart not exists');
        }
        try{
        const day = req.body.day;
        var dc = { "name" : req.body.name, "month" : req.body.month, "year" : req.body.year , "serialNo" : req.body.serialNo } ;        
        chartDB.dataCollection[day].chart = req.body.chart;
        chartDB.dataCollection[day].upper = req.body.upper;
        chartDB.dataCollection[day].lower = req.body.lower;
        chartDB.dataCollection[day].digital = req.body.digital;
        chartDB.dataCollection[day].batCheck = req.body.batCheck;
        chartDB.dataCollection[day].au = req.body.au;
        chartDB.dataCollection[day].userId = req.body.userId;
        
        await RegantRefrigerator.findOneAndUpdate(dc, chartDB, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, err);
            return res.send('Succesfully saved.');
        });
        //res.status(200).json(temp);
        }
        catch (err) {
            logger(err);
            res.status(500).send(err);
            }
    }

    const getRegantChartDetails = async (req, res) => {
        try{
            const regantChart = await RegantRefrigerator.findOne({ "name" : req.body.name, "month" : req.body.month, "year" : req.body.year });
            if (!regantChart) {
                throw new CustomError(404, 'This month chart does not exists');
            }
            else {
                res.status(200).json(regantChart);
            }
        }
        catch(err){
            logger(err);
            res.status(500).send(err);
            }
        }
    const createmonthlyChart = async (req, res) => {
        try{
            const { errors, isValid } = validateCreateMonthChartInput(req.body);
            if (!isValid) {
                throw new CustomError(400, 'Input not valid', errors);
            }
            const chart = await MonthlyLog.findOne({ "name" : req.body.name, "month" : req.body.month, "year" : req.body.year });
            if (chart) {
                throw new CustomError(404, 'This month chart already exists');
            }
            let dailyProcedure = {}
            for(let i = 1; i <= 31 ; i++)
            {
                dailyProcedure[i] = {
                    'day' : i,
                    'dailyProbe' : "",
                    'dailyRegant' : "",
                    'fruitSystem' : "",
                    'userId' : ""
                }
            }

            let weeklyProcedure = {}
            for(let i = 1; i <= 5; i++)
            {
                weeklyProcedure[i] = {
                    'day' : i,
                    'date' : "",
                    'weeklyLiquitSystem' : "",
                    'qcReport' : "",
                    'userId' : ""
                 }
            }

            let monthlyProcedure = {}
            monthlyProcedure[1] = {
                'day' : 1,
                'date' : "",
                'checking' : "",
                'userId' : "",
            }

            const monthlyLog = new MonthlyLog({
                name: req.body.name,
                month: req.body.month,
                year: req.body.year,
                dailyProcedure: dailyProcedure,
                weeklyProcedure: weeklyProcedure,
                monthlyProcedure: monthlyProcedure,
                troubleShootingNotes: ""
              });
            
            const monthlyLodgData = await monthlyLog.save();
            res.status(200).json(monthlyLodgData);

        }
        catch (err) {
            logger(err);
            res.status(500).send(err);
            }
        }
        const updateDailyProcedureMonthChart = async (req, res) => {
            const chart = await MonthlyLog.findOne({ "name" : req.body.name, "month" : req.body.month, "year" : req.body.year});
            if (!chart) {
                throw new CustomError(404, 'This Chart not exists');
            }
            try{
            const day = req.body.day;
            var dc = { "name" : req.body.name, "month" : req.body.month, "year" : req.body.year} ;
            
            chart.dailyProcedure[day].dailyProbe = req.body.dailyProbe;
            chart.dailyProcedure[day].dailyRegant = req.body.dailyRegant;
            chart.dailyProcedure[day].fruitSystem = req.body.fruitSystem;
            chart.dailyProcedure[day].userId = req.body.userId;
            
            await MonthlyLog.findOneAndUpdate(dc, chart, {upsert: true}, function(err, doc) {
                if (err) return res.send(500, err);
                return res.send('Succesfully saved.');
            });
            //res.status(200).json(temp);
            }
            catch (err) {
                logger(err);
                res.status(500).send(err);
            }
        }
        const updateWeeklyProcedureMonthChart = async (req, res) => {
            const chart = await MonthlyLog.findOne({ "name" : req.body.name, "month" : req.body.month, "year" : req.body.year});
            if (!chart) {
                throw new CustomError(404, 'This Chart not exists');
            }
            try{
            const day = req.body.day;
            var dc = { "name" : req.body.name, "month" : req.body.month, "year" : req.body.year} ;
            
            chart.weeklyProcedure[day].date = req.body.date;
            chart.weeklyProcedure[day].weeklyLiquitSystem = req.body.weeklyLiquitSystem;
            chart.weeklyProcedure[day].qcReport = req.body.qcReport;
            chart.weeklyProcedure[day].userId = req.body.userId;
            
            await MonthlyLog.findOneAndUpdate(dc, chart, {upsert: true}, function(err, doc) {
                if (err) return res.send(500, err);
                return res.send('Succesfully saved.');
            });
            }
            catch (err) {
                logger(err);
                res.status(500).send(err);
            }
        }
        const updateMonthlyProcedureMonthChart = async (req, res) => {
            const chart = await MonthlyLog.findOne({ "name" : req.body.name, "month" : req.body.month, "year" : req.body.year});
            if (!chart) {
                throw new CustomError(404, 'This Chart not exists');
            }
            try{
            const day = req.body.day;
            var dc = { "name" : req.body.name, "month" : req.body.month, "year" : req.body.year} ;
            
            chart.monthlyProcedure[day].date = req.body.date;
            chart.monthlyProcedure[day].checking = req.body.checking;
            chart.monthlyProcedure[day].userId = req.body.userId;
            
            await MonthlyLog.findOneAndUpdate(dc, chart, {upsert: true}, function(err, doc) {
                if (err) return res.send(500, err);
                return res.send('Succesfully saved.');
            });
            }
            catch (err) {
                logger(err);
                res.status(500).send(err);
            }
        }
export { createRegantChart,updateRegantChart,getRegantChartDetails,createmonthlyChart,updateDailyProcedureMonthChart,updateWeeklyProcedureMonthChart,updateMonthlyProcedureMonthChart };