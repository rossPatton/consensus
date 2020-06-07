import _ from 'lodash';
import React, {memo} from 'react';

import {Helmet} from '~app/components';
import {Template} from '~app/containers';

import {canonical, description, keywords, title} from './_constants';

const PrivacyContainer = memo(() => (
  <Template>
    <Helmet
      canonical={canonical}
      title={title}
      meta={[
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
      ]}
    />
    <h1 className="mb-1">
      Privacy Policy
    </h1>
    <h2 className="text-3 mb-2">
      Policy Last updated: June 6th, 2020
    </h2>
    <p>Consens.us (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;) operates https://consens.us.org (the&quot;Site&quot;). This page informs you of our policies regarding the collection, use and disclosure ofPersonal Information we receive from users of the Site.</p>
    <p>We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. Information Collection And Use While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you.</p>
    <p>Personally identifiable information may include, but is not limited to your name, or your email (&quot;Personal Information&quot;).</p>
    <h3>Log Data</h3>
    <p>Like many site operators, we collect information that your browser sends whenever you visit our Site(&quot;Log Data&quot;).</p>
    <p>
      This Log Data may include information such as your computer&apos;s Internet Protocol (&quot;IP&quot;) address,browser type, browser version, the pages of our Site that you visit, the time and date of your visit,the time spent on those pages and other statistics.
    </p>
    <h3>Communications</h3>
    <p>We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information.</p>
    <h3>Cookies</h3>
    <p>Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer&apos;s hard drive.Like many sites, we use &quot;cookies&quot; to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>
    <h3>Security</h3>
    <p>The security of your Personal Information is important to us, but remember that no method oftransmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee it&apos;s absolute security.</p>
    <h3>Changes To This Privacy Policy</h3>
    <p>This Privacy Policy is effective as of June 6th, 2020 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically.</p>
    <p>Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and yourconsent to abide and be bound by the modified Privacy Policy.</p>
    <p>If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.</p>
    <h3>Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, please contact us.</p>
  </Template>
));

export default PrivacyContainer;

