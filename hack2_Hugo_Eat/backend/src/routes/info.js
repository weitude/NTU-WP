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
    let priceFilter = req.query.priceFilter
    let mealFilter = req.query.mealFilter
    let typeFilter = req.query.typeFilter
    let sortBy = req.query.sortBy
    console.log(req.query)

    let plen
    if (!priceFilter)
        priceFilter = []
    plen = priceFilter.length
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
    for (let i = 0; i < 3; i++) {
        if (priceFilter[i] === "$")
            priceFilter[i] = 1
        if (priceFilter[i] === "$$")
            priceFilter[i] = 2
        if (priceFilter[i] === "$$$")
            priceFilter[i] = 3
    }

    let mlen
    if (!mealFilter)
        mealFilter = []
    mlen = mealFilter.length
    let tlen
    if (!typeFilter)
        typeFilter = []
    tlen = typeFilter.length

    let temp

    if (mlen === 0 && tlen === 0) {
        Info
            .find({$or: [{price: priceFilter[0]}, {price: priceFilter[1]}, {price: priceFilter[2]}]})
            .sort({[sortBy]: 1})
            .exec((err, data) => {
                if (err) {
                    res.status(403).send({message: 'error', contents: []})
                }
                else {
                    res.status(200).send({message: 'success', contents: data})
                }
            })
    }
    else if (mlen === 0 && tlen !== 0) {
        temp = typeFilter[0]
        for (let i = tlen; i < 6; i++) {
            typeFilter.push(temp)
        }
        Info
            .find({
                $and: [
                    {$or: [{price: priceFilter[0]}, {price: priceFilter[1]}, {price: priceFilter[2]}]},
                    {
                        $or: [{tag: typeFilter[0]}, {tag: typeFilter[1]}, {tag: typeFilter[2]},
                            {tag: typeFilter[3]}, {tag: typeFilter[4]}, {tag: typeFilter[5]}]
                    }
                ]
            })
            .sort({[sortBy]: 1})
            .exec((err, data) => {
                if (err) {
                    res.status(403).send({message: 'error', contents: []})
                }
                else {
                    res.status(200).send({message: 'success', contents: data})
                }
            })
    }
    else if (mlen !== 0 && tlen === 0) {
        temp = mealFilter[0]
        for (let i = mlen; i < 3; i++) {
            mealFilter.push(temp)
        }
        Info
            .find({
                $and: [
                    {$or: [{price: priceFilter[0]}, {price: priceFilter[1]}, {price: priceFilter[2]}]},
                    {$or: [{tag: mealFilter[0]}, {tag: mealFilter[1]}, {tag: mealFilter[2]}]}
                ]
            })
            .sort({[sortBy]: 1})
            .exec((err, data) => {
                if (err) {
                    res.status(403).send({message: 'error', contents: []})
                }
                else {
                    res.status(200).send({message: 'success', contents: data})
                }
            })
    }
    else {
        temp = mealFilter[0]
        for (let i = mlen; i < 3; i++) {
            mealFilter.push(temp)
        }
        temp = typeFilter[0]
        for (let i = tlen; i < 6; i++) {
            typeFilter.push(temp)
        }
        Info
            .find({
                $and: [
                    {$or: [{price: priceFilter[0]}, {price: priceFilter[1]}, {price: priceFilter[2]}]},
                    {$or: [{tag: mealFilter[0]}, {tag: mealFilter[1]}, {tag: mealFilter[2]}]},
                    {
                        $or: [{tag: typeFilter[0]}, {tag: typeFilter[1]}, {tag: typeFilter[2]}, {tag: typeFilter[3]},
                            {tag: typeFilter[4]}, {tag: typeFilter[5]}]
                    }
                ]
            })
            .sort({[sortBy]: 1})
            .exec((err, data) => {
                if (err) {
                    res.status(403).send({message: 'error', contents: []})
                }
                else {
                    res.status(200).send({message: 'success', contents: data})
                }
            })
    }
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/
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