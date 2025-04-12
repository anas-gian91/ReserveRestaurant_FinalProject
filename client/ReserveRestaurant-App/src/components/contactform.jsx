function contactForm(){
    return(
        <div className="contact-form">
            <h2>Contact Us</h2>
            <form>
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email" required />
                <textarea placeholder="Message" required></textarea>
                <button type="submit">Send</button>
            </form>
            <p>For immediate assistance, call us at 123-456-7890.</p>
            <p>Follow us on social media:</p>
            <ul className="social-media-links">
                <li><a href="https://www.facebook.com">Facebook</a></li>
                <li><a href="https://www.twitter.com">Twitter</a></li>
                <li><a href="https://www.instagram.com">Instagram</a></li>
            </ul>
    </div>
    );
};

export default contactForm;