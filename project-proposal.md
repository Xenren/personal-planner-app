# Plan-It - Kamren Green

## Introduction

The project is a calendar web application for scheduling events with a personalized homepage to make it feel like a planner.

The idea started with my girlfriend using a plain notebook as a planner in order to draw cover pages to separate each month. After seeing her repeat the effort of drawing the calendar each month, I devised a plan to create a virtual planner that would allow her to personalize the homepage and keep track of her events in a calendar format.

My background is primarily in backend software engineering. I have experience in creating small Python applications including those running as web applications backed by databases.
I knew that my database experience would assist me in this project, but I decided to go out of my comfort zone and create this application in TypeScript in order to fully experience the web development side of things. Lastly, I recently started a company with my friends which has provided experience in project management, cloud-based services, and generally delivering a product to a client. All of these skills are applicable to various portions of the project as will be discussed in future sections of this proposal.

Finally, the goal of the application is provide a pleasurable planning experience first and foremost. While the customization is important to the final product, an emphasis will be on the functionality as it pertains to both web development and database principles.

## Customer Value

Focusing on the business to consumer market, the primary customer are those looking for a more personalized calendar solution. Something more like a physical planner than a calendar.
The customer desires the customization without the hassle of hand drawing the calendar each time.

This gives me the perfect angle to create a meaningful solution that solves a real problem. My application can provide faster tracking of activities than a physical planner while maintaining the personal connection one experiences by decorating something as their own.

I have tested a rudimentary form of the application on the original intended consumer, which allowed me to define a few metrics for measuring customer success.

From the customer-centric perspective, I jotted down a list of the minimal features required, as well as the ideal features of the final iteration. This way, I have a starting point and an ending point, and can continually get feedback on the existing features, as well as new features as they arrive. Furthermore, I plan to use statistics such as daily logins and average number of calendar activities per user to determine whether my customers are getting the value I desire and in turn, actually replacing their physical planners with my web application.

On the technical side, I have enabled analytics that I will monitor to ensure a positive user experience including load times, caching, and server load. In addition, the PostgresSQL database I have chosen to go with for this project, Supabase, provides a helpful dashboard for ensuring that all CRUD operations are successful and swift, ensuring a functional and responsive experience for the customer.

## Technology

### System:

At a high level, the system consists of a web application frontend connected to PostgresSQL database that stores and handles both user authentication as well as uploaded user content such as images and activity data.

The minimum system must include a way to interact with the calendar, the backend for storing and retrieving calendar activities on demand, and a form of updating and deleting existing events.
These three features cover the primary objectives of the calendar aspect and will be the basis for further improvements.
Lastly, a way to upload images for the personalized cover page is the most primitive version of the cover page that will still serve to solve the desired problem.

Additional features would directly build upon the minimum system requirements. The calendar could include easier ways to edit the events on the calendar such as drag and dropping events to move them and dragging to re-size them to adjust the time. This would further increase the viability of my use case, as having to erase and re-write events was one of the primary pain points with the physical planner.
Customization could be enhanced by adding fully editable cover pages that allow for free-drawing and text boxes. This way, a digital image does not have to be used and it will more closely resemble a traditional planner.
Furthermore, a request for business purposes was made for a feature that would allow other users to be added to events. This way, the calendar could be used for scheduling purposes. Although this is not directly supporting my target customer base, consumers may likely find value in the feature as well, broadening my total addressable market without compromising my core customer base.

Testing will involve several procedures. At the unit level, tests will be written to ensure that basic features and frontend components are not only functional but running in an efficient manner. This includes inspecting the website's logs to make sure rendering, fetching and caching are working as intended.
Integration tests will be implemented through GitHub actions in order to ensure that new features do not break existing ones. These tests are run on every commit which ensures consistency and functionality throughout the entire life cycle of the project.

### Tools:

The proposed tech stack consists of two major pieces for the frontend and one for the backend.

Vercel is the chosen deployment platform for its use and natural integration of TypeScript and React through their Next.js runtime. This allows me to host the frontend website on AWS without having to manage the infrastructure directly. In addition, the Vercel GitHub app provides a seamless CI/CD pipeline that enables me to focus on customizing the build tests to my needs and working on the application itself.

As briefly mentioned, React also plays a significant role in the frontend by providing a framework to create styled components. For example, shadcn and Aceternity maintain professional components that are widely used across React development. They serve as a starting point for creating high quality applications without needing to write boilerplate code for inputs, modals, and similar basic UI components.

Supabase is the main backend component of the system. They provide user management and a PostgresSQL database in one platform, making them the perfect choice for this project. I am able to define my own database schemas to maintain control over the organization of user data while not having to implement a form of user authentication from scratch.
This enables me to focus on the database aspect of the project and directly apply it to providing a benefit to a customer. In this case, the PostgresSQL database is used to store and serve the content that users create and upload. It is setup to do this in a fast, efficient, thread-safe manner with secret management to ensure the security of my user's data.

# Background

I am completing the final project solo, so the "_Team_" section as been changed to focus on my background and the various roles I will have to take on throughout the duration of the project.

I have experience with the general process that this project involves, but there are plenty of challenges that I will have to overcome. For starters, I have previously built a web application in Python that is supported by a Redis database and a vector database.
In addition, I have written MySQL queries for learning purposes, but have never written my own schema or used PostgresSQL. This gives me the ability to use my experience to guide me but still leave room for growth.

My previous websites have been deployed to Vercel so I am familiar with the platform. I have, however, already had to expand my knowledge of Vercel and Next.js in order implement things like dynamic routing to accommodate multiple users.
I have rudimentary knowledge of TypeScript, React and TailwindCSS which will empower me to make the stylistic choices that the customer desires.
I have no previous experience with the Supabase platform or managing user content in a PostgresSQL database.

The nature of completing the project solo brings along the challenge of having to take on every role in one form or another. My plan is to take on the following roles in order to cover all the required areas of the project:

1. _Project Manager_ - I will begin in this role as I decipher the exact requirements from the customer, put together a feasible timeline for completion, and write the proposal.
2. _Lead Engineer_ - I will transition into the lead engineer role and develop the initial version of the project that satisfies that minimum system as described.
3. _Client Liaison_ - I will take on the role of client liaison as I get feedback from users on the basic features and design.

While I do not have to manage or evaluate team communication and collaboration, I will have to fill all roles simultaneously. Following these initial tasks, all three roles will have new ongoing responsibilities. They can be distilled in these primary components:

1. _Project Manager_ - Maintaining deadlines, updating the requirements based on the client feedback, and creating the poster for the final presentation of the project.
2. _Lead Engineer_ - Monitor logs, fix bugs, and implement the additional features in the order specified by customer demand.
3. _Client Liaison_ - Periodic check-ins with customers, creation of customer feedback tools such as surveys, as well as analysis of customer-centric metrics.

The combination of defined roles and my previous development experience will empower me to be successful in all aspects.

## Project Management

The project is definitely feasible. I have already started on the implementation in order to complete it in time, but the requirements are not too complicated for my ability, it is simply a large time commitment.

Since weekly meetings are not required without a team, I will focus on weekly deliverables instead. This way, I am still forced to maintain a schedule to gain the experience and ensure I complete the project on time.

The planned timeline is as follows:

- Apr 1st - Apr 3rd: Gathering Requirements & Research
- Apr 3rd - Apr 7th: Basic Functionality
- Apr 8th - Apr 14th: Project Proposal & Initial Testing
- Apr 15th - Apr 21th: Additional Features & Customer Feedback
- Apr 22nd - Apr 28th: Finishing Touches & Final Poster

Below is a visual outline of the timeline using Plan-It:

![Project Timeline](./media/project_timeline.png)

This serves to further establish the feasibility of the project by presenting a proof of concept in addition to a reasonable timeline.

The only regulatory constraints would be due to the collection of personally identifiable information (PII).
Only email and password are collected where the email is stored in a secure storage in AWS and the password is encrypted before entering the database so even I am not aware of the value. This covers the bases as far as regulatory concerns.

Finally, resources will not be a hindrance to the completion of the project. Vercel offers a generous free tier for the deployments. Furthermore, Supabase's free tier offers 50,000 monthly active users (MAUs) which will be more than enough. They additionally give 500MB of database space and 1 GB of file storage which should prove sufficient for the scale of this project.
The only aspect that would cost money is the domain name for hosting the application, but I have deployed it to a subdomain of a domain I already own, so no cost was occurred there either.

In closing, the project should be completed and presented in the time allotted without too much pressure from a time management perspective, barring any unexpected changes to the Vercel or Supabase free tiers.

## Reflection

Thus far, the application has a very simplistic homepage before logging in, login and logout pages, as well as a personal homepage and calendar for each user.
User authentication for creating accounts works in the most basic case possible. The automated email to verify users on sign-up is extremely primitive, quite slow (~10 minutes), and the verification does not route the user properly.
It does, however, serve its basic function as the link verifies the user on the backend.

The primary components have their core functionalities almost complete. Images are uploadable and selectable, but the changes are not implemented in the database or frontend to make the cover change store between sessions.
The calendar portion of the app has multiple views for month, day, year, adding events, and editing events with changes saved between sessions. A few of the additional functionalities such as drag and dropping and re-sizing are working in basic states but have room for improvement.

Continuing on, the UI components went smoother than I anticipated. In addition, creating an effective schema for storing calendar activity state was easier than I thought it was going to be. In turn, interactions with the database were more straightforward to implement in my code as I was very familiar with the table schema.

User authentication still proved difficult despite choosing to work with a pre-configured solution. Originally, a service called Clerk was utilized for managing users, but it was ultimately too restrictive for this project.
Upon further research I found Supabase which not only had a more robust user authentication system, but also provided a database allowing to me to satisfy both of the available topics for the final project.

Another portion that has challenged me is the loading of user images. In this case, improvements will have to be made to the object storage and retrieval mechanisms. While I anticipate this being one of the more difficult problems, it is sure to give me an idea of the problems web developers face in their work.

Moving forward, the primary areas of focus are finalizing the calendar features, enhancing the customizability of the homepage, and styling the application to portray a more professional appearance.
