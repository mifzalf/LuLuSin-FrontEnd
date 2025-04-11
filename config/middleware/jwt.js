function authorize(AllowedRoles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        console.log('authorize - Checking user:', req.user); 
        console.log('authorize - Allowed Roles:', AllowedRoles); 
        console.log('authorize - User Type:', req.user.type); 
        console.log('authorize - Is role allowed?', AllowedRoles.includes(req.user.type)); 

        if (!req.user.type || !AllowedRoles.includes(req.user.type)) {
             console.log('authorize - Access Denied!'); 
             return res.status(403).json({ message: 'Access denied: You do not have permission for this resource' });
        }

        console.log('authorize - Access Granted!');
        next();
    }
} 