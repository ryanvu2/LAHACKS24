import React, { useState } from 'react';
import Select from 'react-select';
import './SignUp.css';

function SignUp() {
    const [selectedPic, setSelectedPic] = useState(null);

    // Options for react-select
    const profilePics = [
        { value: 'url_to_image_1.jpg', label: 'Player', image: 'https://i5.walmartimages.com/seo/Funko-POP-Basketball-Team-USA-Karl-Malone-113-Exclusive_9e11c344-24b1-4e91-8b8f-43e210792a16.78e897552252442104d4477de4d2c848.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF' },
        { value: 'url_to_image_2.jpg', label: 'Mickey', image: 'https://images.bigbadtoystore.com/images/p/full/2021/11/d7c38d32-211c-4db2-803c-ecc3b19df4de.jpg' },
        { value: 'url_to_image_3.jpg', label: 'Shark', image: 'https://cdn.shopify.com/s/files/1/0268/8129/4530/products/63257_TSS_KingShark_MT_POP_GLAM-WEB.jpg?v=1650036509' },
        { value: 'url_to_image_4.jpg', label: 'Baymax', image: 'https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dw9f3e00d3/images/funko/66312-1.png' },
        { value: 'url_to_image_5.jpg', label: 'Powerpuff', image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6480/6480520cv11d.jpg' }
    ];

    // Customizing the options to include images
    const formatOptionLabel = ({ image, label }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={image} alt={label} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }} />
            <span>{label}</span>
        </div>
    );

    return (
        <div className="form-container">
            <form className="signup-form">
                <h1>Sign Up</h1>
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="text" name="firstName" placeholder="First Name" required />
                <input type="text" name="lastName" placeholder="Last Name" required />

                <Select 
                    options={profilePics}
                    value={selectedPic}
                    onChange={setSelectedPic}
                    formatOptionLabel={formatOptionLabel}
                    isSearchable={false} // Optional: Disables searching, simplifying the select box
                />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
