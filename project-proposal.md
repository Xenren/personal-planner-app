# Plan-It! - Kamren Green

## Introduction

The project is a calendar web application for scheduling events with a personalized homepage to make it feel like a planner.

The idea started with my girlfriend drawing cover pages to separate each month in her physical planner. After seeing her repeat the effort of drawing the calendar each month, I devised a plan to create a virtual planner that would allow her to personalize the homepage and keep track of her events in a calendar format.

My background is primarily in backend software engineering. I have experience in creating small Python applications including those running as web applications backed by databases.
I knew that my database experience would assist me in this project, but I decided to go out of my comfort zone and create this application in TypeScript in order to fully experience the web development side of things. Lastly, I recently started a company with my friends which has provided experience in project management, cloud-based services, and generally delivering a product to a client. All of these skills are applicable to various portions of the project as will be discussed in future sections of this proposal.

Finally, the goal of the application is provide a pleasurable planning experience first and foremost. While the customization is important to the final product, an emphasis will be on the functionality portion as that is where my personal expertise lies. It does, however, rely on both web development principles as well as database systems.

## Customer Value

The primary customer are those looking for a more personalized calendar solution. Something more like a physical planner than a calendar.
The customer wants the customization without the hassle of hand drawing the calendar each time.

This gives me the perfect angle to create a meaningful solution that solves a real problem. My application can provide faster tracking of activities than a physical planner while maintaining the personal connection ones experiences by decorating something as their own.

I have tested a rudimentary form of the application on the original intended consumer, which allowed me to define a few metrics for measuring customer success.

From the customer-centric perspective, I jotted down a list of the minimal features required, as well as the ideal features of the final iteration. This way, I have a starting point and an ending point, and can continually get feedback on the existing features, as well as new features as they arrive. Furthermore, I plan to use statistics such as daily logins and average number of calendar activities per user to determine whether my customers are getting the value I desire and in turn, actually replacing their physical planners with my web application.

On the technical side, I have enabled analytics that I will monitor to ensure a positive user experience including fast load times, proper caching, and handling server load. In addition, the PostgresSQL database I have chosen to go with for this project, Supabase, provides a helpful dashboard for ensuring that all CRUD operations are successful and swift, ensuring a functional and responsive experience for the customer.

## Technology

### System:

At a high level, the system consists of a web application frontend connected to PostgresSQL database that stores and handles both user authentication as well as uploaded user content such as images and activity data.

The minimum system must include a way to interact with the calendar, the backend for storing and retrieving calendar activities on demand, a form of updating and deleting existing events.
These three features cover the primary objectives of the calendar aspect and will be the basis for further improvements.
Lastly, a way to upload images for the personalized cover page is the most primitive version of the cover page that will still serve to solve the desired problem.

Additional features would directly build upon the minimum system requirements. The calendar could include easier ways to edit the events on the calendar such as drag and dropping events to move them and dragging to re-size them (adjust the time). This would further increase the viability of my use case, as having to erase and re-write events was one of the primary pain points with the physical planner.
Customization could be enhanced by fully editable cover pages that allow for free-drawing and text boxes. This way, a digital image does not have to be used and it will more closely resemble a traditional planner.

Testing will involve several procedures. At the unit level, tests will be written to ensure that basic features and frontend components are not only functional but running in an efficient manner. This includes inspecting the website's logs to make sure rendering, fetching and caching are working as intended.
Integration tests will be implemented through GitHub actions in order to ensure that new features do not break existing ones. These tests are run on every commit which ensures consistency and functionality throughout the entire life cycle of the project.

### Tools:

The proposed tech stack consists of two major pieces for the frontend and one for the backend.

Vercel is the chosen deployment platform for its use and natural integration of TypeScript and React through their Next.js runtime. This allows me to host the frontend website on AWS without having to manage the infrastructure directly. In addition, the Vercel GitHub app provides a seamless CI/CD pipeline that enables me to focus on customizing the build tests to my needs and working on the application itself.

As briefly mentioned, React also plays a significant role in the frontend by providing a framework to create styled components. The UI components from shadcn and Aceternity are professionally maintained components and widely used across React development. They serve as a starting point for creating high quality applications without needing to write boilerplate code for inputs, modals, and similar basic UI components.

Supabase is the main backend component of the system. They provide user management and a PostgresSQL database in one platform, making them the perfect choice for this project. I am able to define my own database schemas to maintain control over the organization of user data while not having to implement a form of user authentication from scratch.
This enables me to focus on the database aspect of the project and directly apply it to providing a benefit to a customer. In this case, the PostgresSQL database is used to store and serve the content that users create and upload. It is setup to do this in a fast, efficient, thread-safe manner with secret management to ensure the security of my user's data.

# Background

I am completing the final project solo, so the "_Team_" section as been changed to focus on my background and expertise surrounding the proposed project.

I have experience with the general process that this project involves, but there are plenty of challenges that I will have to overcome. For starters, I have previously built a web application in Python that is supported by a Redis database and a vector database.
In addition, I have written MySQL queries for learning purposes, but have never written my own schema or used PostgresSQL. This gives me the ability to use my experience to guide me but still leave room for growth.

My previous websites have been deployed to Vercel so I am familiar with the platform. I have, however, already had to expand my knowledge of Vercel and Next.js in order implement things like dynamic routing to accommodate multiple users.
I have rudimentary knowledge of TypeScript, React and TailwindCSS which will empower me to make the stylistic choices that the customer desires.
I have no previous experience with a Supabase platform or managing user content in a PostgresSQL database.

The nature of completing the project solo brings along the challenge of having to take on every role in one form or another. My plan is to take on the following roles in order to cover all the required areas of the project:

1. Project Manager - I will begin in this role as I decipher the exact requirements from the customer, put together a feasible timeline for completion, and write finalize the proposal.
2. Lead Engineer - I will transition into the lead engineer role and develop the initial version of the project that satisfies that minimum system as described.
3. Client Liaison - I will take on the role of client liaison as I get feedback from users on the basic features and design.

While I do not have to manage or evaluate team communication and collaboration, all three roles will have new ongoing responsibilities that I will have to fulfill simultaneously. They can be distilled in these primary components:

1. Project Manager - Maintaining deadlines, updating the requirements based on the client feedback, and creating the poster for the final presentation of the project.
2. Lead Engineer - Fix bugs and implement the additional features mentioned in the order of priority as described by the customer.
3. Client Liaison - Periodic check-ins with customers, creation of customer feedback tools such as surveys, as well as analysis of customer-centric metrics.

The combination of defined roles and my previous development experience will permit me to be successful in all aspects.

## Project Management

The project is definitely feasible. I have already started on the implementation in order to complete it in time, but the requirements are not too complicated for my ability, it is simply a large time commitment.

Since weekly meetings are not required without a team, I will focus on weekly deliverables instead. This way, I am still forced to maintain a schedule to gain the experience and ensure I complete the project on time.

My timeline is as follows:

- Apr 2nd - Apr 4th: Basic functionality
- Apr 8th - Apr 12th: Project Proposal & Initial Testing
- Apr 15th - Apr 19th: Additional Features & Customer feedback
- Apr 22nd - Apr 26th: Finishing Touches & Final Poster/Presentation

A visual outline of the timeline using the planner app:

The only regulatory constraints would be due to the collection of personally identifiable information (PII).
Only email and password are collected where the email is stored in a secure storage in AWS and the password is encrypted before entering the database so even I am not aware of the value. This covers the bases as far as regulatory concerns.

Finally, resources will not be a hindrance to the completion of the project. Vercel offers a generous free tier for all the deployments. Furthermore, Supabase's free tier offers 50,000 monthly active users (MAUs) which will be more than enough. They additionally give 500MB of database space and 1 GB of file storage which should prove sufficient.
The only aspect that would cost money is the domain name for hosting the application, but I have deployed it to a subdomain of a domain I already own, so no cost was occurred there either.

In closing, the project should be completed and presented in the time allotted without too much pressure from a time management perspective, barring any unexpected roadblocks or changes to the Vercel or Supabase free tiers.

## Reflection
