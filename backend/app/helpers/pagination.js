const { Op } = require('sequelize');

async function paginate(model, pageNumber, pageSize, searchString, filters,whereClause) {
    const sortColumn = 'id'
    const  sortDirection = 'DESC'
    const offset = (pageNumber - 1) * pageSize;
    // let whereClause = {};

     // Apply search string
     if (searchString) {
        console.log(searchString);
        const searchConditions = {
            [Op.or]: Object.keys(model.rawAttributes)
                .filter(attr => model.rawAttributes[attr].type.key === 'STRING')
                .map(attr => ({
                    [attr]: {
                        [Op.like]: `%${searchString}%` // Use LIKE for MySQL
                    }
                }))
        };
        whereClause = { ...whereClause, ...searchConditions };
    }

    // Apply filters
    Object.keys(filters).forEach(field => {
        if (model.rawAttributes[field]) {
            whereClause[field] = filters[field];
        }
    });

    const data = await model.findAndCountAll({
        where: whereClause,
        limit: pageSize,
        offset: offset,
        order: [[sortColumn, sortDirection]]
    });

    return {
        data: data.rows,
        total: data.count
    };
}

module.exports = {
    paginate
};
