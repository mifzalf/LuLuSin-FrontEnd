function authorize(AllowedRoles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Convert single role to array for consistency
        const roles = Array.isArray(AllowedRoles) ? AllowedRoles : [AllowedRoles];
        
        console.log('authorize - Checking user:', req.user); 
        console.log('authorize - Allowed Roles:', roles); 
        console.log('authorize - User Type:', req.user.type); 
        console.log('authorize - Is role allowed?', roles.includes(req.user.type)); 

        if (!req.user.type || !roles.includes(req.user.type)) {
             console.log('authorize - Access Denied!'); 
             return res.status(403).json({ message: 'Access denied: You do not have permission for this resource' });
        }

        console.log('authorize - Access Granted!');
        next();
    }
} 

module.exports = authorize; 