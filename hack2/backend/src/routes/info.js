// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    let priceFilter = req.query.priceFilter
    let mealFilter = req.query.mealFilter
    let typeFilter = req.query.typeFilter
    let sortBy = req.query.sortBy
    console.log(req.query)
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })`
    let plen
    if (!priceFilter)
        priceFilter = []
    plen = priceFilter.length

    let mlen
    if (!mealFilter)
        mealFilter = []
    mlen = mealFilter.length

    let tlen
    if (!typeFilter)
        typeFilter = []
    tlen = typeFilter.length

    if (plen === 0) {
        priceFilter.push("$")
        priceFilter.push("$$")
        priceFilter.push("$$$")
    }
    else {
        let temp = priceFilter[0]
        for (let i = plen; i < 3; i++) {
            priceFilter.push(temp)

        }
    }
    for (let i = 0; i < 3; i++)
    {
        if (priceFilter[i] === "$")
            priceFilter[i] = 1
        if (priceFilter[i] === "$$")
            priceFilter[i] = 2
        if (priceFilter[i] === "$$$")
            priceFilter[i] = 3
    }
    if (mlen === 0) {
        mealFilter.push("Breakfast")
        mealFilter.push("Lunch")
        mealFilter.push("Dinner")
    }
    else {
        let temp = mealFilter[0]
        for (let i = mlen; i < 3; i++) {
            mealFilter.push(temp)

        }
    }
    if (tlen === 0) {
        typeFilter.push("Chinese")
        typeFilter.push("American")
        typeFilter.push("Italian")
        typeFilter.push("Japanese")
        typeFilter.push("Korean")
        typeFilter.push("Thai")
    }
    else {
        let temp = typeFilter[0]
        for (let i = tlen; i < 3; i++) {
            typeFilter.push(temp)
        }
    }
    console.log(priceFilter, mealFilter, typeFilter)


    // TODO Part I-3-a: find the information to all restaurants
    if (sortBy === "price") {
        Info.find({
            $and: [
                {$or: [{price: priceFilter[0]}, {price: priceFilter[1]}, {price: priceFilter[2]}]},
                {$or: [{tag: mealFilter[0]}, {tag: mealFilter[1]}, {tag: mealFilter[2]}]},
                {
                    $or: [{tag: typeFilter[0]}, {tag: typeFilter[1]}, {tag: typeFilter[2]},
                        {tag: typeFilter[3]}, {tag: typeFilter[4]}, {tag: typeFilter[5]}]
                }
            ]
        }).sort({price: 1}).exec((err, data) => {

            if (err) {
                console.log("err data", data)

                res.status(403).send({message: 'error', contents: []})
            }
            else {
                console.log("data", data)
                res.status(200).send({message: 'success', contents: data})
            }
        })
    }

    else if (sortBy === "distance") {
        Info.find({
            $and: [
                {$or: [{price: priceFilter[0]}, {price: priceFilter[1]}, {price: priceFilter[2]}]},
                {$or: [{tag: mealFilter[0]}, {tag: mealFilter[1]}, {tag: mealFilter[2]}]},
                {
                    $or: [{tag: typeFilter[0]}, {tag: typeFilter[1]}, {tag: typeFilter[2]},
                        {tag: typeFilter[3]}, {tag: typeFilter[4]}, {tag: typeFilter[5]}]
                }
            ]
        }).sort({distance: 1}).exec((err, data) => {

            if (err) {
                res.status(403).send({message: 'error', contents: []})
            }
            else {
                res.status(200).send({message: 'success', contents: data})
            }
        })
    }


    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
    Info.findOne({id: id}).exec((err, data) => {

        if (err) {
            res.status(403).send({message: 'error', contents: []})
        }
        else {
            res.status(200).send({message: 'success', contents: data})
        }
    })
}