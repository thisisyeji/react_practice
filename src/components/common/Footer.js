import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faDribbble } from '@fortawesome/free-brands-svg-icons';

function Footer() {
	return (
		<footer>
			<div className='upper'>
				<h1>
					<img
						src={process.env.PUBLIC_URL + '/img/logo_b.png'}
						alt='CONVERSE'
					/>
				</h1>
				<nav>
					<dl>
						<dt>COMMUNITY</dt>

						<dd>About</dd>
						<dd>Submit on Issue</dd>
						<dd>Github repo</dd>
						<dd>Slack</dd>
					</dl>

					<dl>
						<dt>GETTING STARTED</dt>

						<dd>Inroduction</dd>
						<dd>Documentation</dd>
						<dd>Usage</dd>
						<dd>Globals</dd>
						<dd>Elements</dd>
						<dd>Collections</dd>
						<dd>Themes</dd>
					</dl>

					<dl>
						<dt>RESOURCES</dt>

						<dd>API</dd>
						<dd>Form Validation Product</dd>
						<dd>Visibility</dd>
						<dd>Accessebility</dd>
						<dd>Community</dd>
						<dd>Design Defined</dd>
						<dd>Marketplace</dd>
					</dl>
				</nav>
			</div>

			<div className='lower'>
				<p>&copy; 2022 CONVERSE. All rights reserved.</p>
				<ul className='terms'>
					<li>Terms of Service</li>
					<li>Privacy Policy</li>
					<li>Security</li>
					<li>Sitemap</li>
				</ul>

				<ul className='sns'>
					<li>
						<FontAwesomeIcon icon={faTwitter} />
					</li>
					<li>
						<FontAwesomeIcon icon={faGithub} />
					</li>
					<li>
						<FontAwesomeIcon icon={faFacebook} />
					</li>
					<li>
						<FontAwesomeIcon icon={faDribbble} />
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
