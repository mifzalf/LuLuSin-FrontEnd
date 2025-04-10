function authorize(AllowedRoles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json ({ message: 'User not authentacated'})
        }
        if (!AllowedRoles.includes(req.user.userType)) { 
            return res.status(403).json ({ message: 'Acess denied: You do not have premission'}) 
        }
        next()
    }
} 