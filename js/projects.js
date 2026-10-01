/**
 * Projects Data Source & Modal Details
 * Philopater Ashraf William - Portfolio
 */

const portfolioProjects = [
  {
    id: "route-fitness",
    title: "Route Fitness (Gym Management Backend)",
    category: "enterprise",
    featured: true,
    tagline: "High-Performance Gym Management System built with Onion Architecture",
    shortDescription: "A robust enterprise-grade gym management backend built with Onion Architecture, ASP.NET Core MVC, Entity Framework Core, and SQL Server. Implements Unit of Work and Generic Repository patterns for high maintainability.",
    bannerIcon: "🏋️‍♂️",
    architectureBadge: "Onion Architecture",
    architecture: {
      domain: "Entities (Member, Trainer, Session, Subscription), Enums, Domain Exceptions",
      application: "Interfaces (IRepository, IUnitOfWork), DTOs, AutoMapper Profiles, Service Contracts",
      infrastructure: "AppDbContext, EF Core Configurations, Migrations, Repository Implementations, SQL Server",
      presentation: "ASP.NET Core MVC Controllers, ViewModels, Middleware, Cookie/JWT Auth, Dependency Injection"
    },
    keyFeatures: [
      "Designed and implemented clean Onion Architecture separating domain logic from persistence infrastructure.",
      "Generic Repository & Unit of Work patterns ensuring transaction consistency and eliminating redundant data queries.",
      "Member lifecycle & subscription tracking with automated expiration alerts and renewal pipelines.",
      "Trainer scheduling & interactive session reservation engine with concurrency conflict handling.",
      "Database schema normalization and indexing in SQL Server for rapid query resolution.",
      "AutoMapper integration for decoupling Domain entities from presentation ViewModels & DTOs."
    ],
    techStack: [
      "C#",
      ".NET 8",
      "ASP.NET Core MVC",
      "Entity Framework Core",
      "SQL Server",
      "AutoMapper",
      "Unit of Work",
      "Generic Repository",
      "LINQ",
      "Bootstrap 5"
    ],
    githubUrl: "https://github.com/Philopateer18/RouteFitness-GymSystem",
    swaggerUrl: null,
    sampleSnippet: `// Unit of Work Implementation in Route Fitness
public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;
    public IMemberRepository Members { get; }
    public ITrainerRepository Trainers { get; }
    public ISubscriptionRepository Subscriptions { get; }

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
        Members = new MemberRepository(_context);
        Trainers = new TrainerRepository(_context);
        Subscriptions = new SubscriptionRepository(_context);
    }

    public async Task<int> CompleteAsync()
    {
        return await _context.SaveChangesAsync();
    }
}`
  },
  {
    id: "ecommerce-api",
    title: "Enterprise E-Commerce RESTful Web API",
    category: "webapi",
    featured: true,
    tagline: "Scalable RESTful Web API with JWT Authentication, EF Core & Swagger",
    shortDescription: "A modular, scalable e-commerce RESTful API architected for high transaction volume. Features JWT token-based authentication, role-based authorization, FluentValidation, and Swagger documentation.",
    bannerIcon: "🛒",
    architectureBadge: "Clean Web API",
    architecture: {
      domain: "Product, Category, Order, OrderItem, Customer, Cart Entities",
      application: "ProductService, OrderProcessingService, AuthManager, DTOs, FluentValidators",
      infrastructure: "EF Core DbContext, SQL Server, Identity Services, Token Generation",
      presentation: "Controllers (AuthController, ProductsController, OrdersController), Global Exception Middleware"
    },
    keyFeatures: [
      "RESTful API design adhering to HTTP status codes, idempotent operations, and pagination/filtering.",
      "Secure authentication using ASP.NET Core Identity with JWT (JSON Web Tokens) and Refresh Tokens.",
      "Role-Based Access Control (RBAC) separating Admin, Inventory Manager, and Customer privileges.",
      "FluentValidation integration ensuring complete request validation before controller execution.",
      "Global Exception Handling Middleware producing standardized RFC 7807 Problem Details responses.",
      "Interactive OpenAPI / Swagger documentation with Bearer Token authorization pre-configured."
    ],
    techStack: [
      "C#",
      "ASP.NET Core Web API",
      "Entity Framework Core",
      "SQL Server",
      "JWT Authentication",
      "Swagger / OpenAPI",
      "FluentValidation",
      "Postman",
      "Git"
    ],
    githubUrl: "https://github.com/Philopateer18/Enterprise-ECommerce-API",
    swaggerUrl: "https://Philopateer18.github.io/swagger-preview",
    sampleSnippet: `// Secure Product Controller with Caching & Specification Pattern
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(Pagination<ProductToReturnDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
        [FromQuery] ProductSpecParams specParams)
    {
        var products = await _productService.GetProductsAsync(specParams);
        return Ok(products);
    }
}`
  },
  {
    id: "task-workflow-api",
    title: "Task & Project Management Web API",
    category: "webapi",
    featured: false,
    tagline: "Collaborative Project Tracking API with CQRS & Dependency Injection",
    shortDescription: "A productivity and agile workflow API built with ASP.NET Core. Implements clean repository abstractions, real-time status transitions, and relational database integrity.",
    bannerIcon: "📋",
    architectureBadge: "Repository Pattern",
    architecture: {
      domain: "Workspace, Project, TaskItem, Assignee, ActivityLog, Priority",
      application: "TaskDTOs, StatusTransitionValidators, NotificationService",
      infrastructure: "SQL Server Stored Procedures, EF Core Linq Queries, Audit Log DbContext",
      presentation: "RESTful Web API, Postman collections with automated pre-request test scripts"
    },
    keyFeatures: [
      "Automated state machine managing task statuses (Backlog, In Progress, Review, Completed).",
      "Dependency Injection configured across transient, scoped, and singleton service lifetimes.",
      "Relational database design in SQL Server with foreign key constraints, cascaded rules, and non-clustered indexes.",
      "Optimized LINQ queries with AsNoTracking() for high-speed read scenarios.",
      "Automated audit logging capturing entity modification timestamps and user actions."
    ],
    techStack: [
      "C#",
      ".NET Web API",
      "SQL Server",
      "LINQ",
      "EF Core",
      "Dependency Injection",
      "Postman",
      "Git"
    ],
    githubUrl: "https://github.com/Philopateer18/TaskManagement-API",
    swaggerUrl: null,
    sampleSnippet: `// LINQ Query Optimization with AsNoTracking and Projection
public async Task<IReadOnlyList<TaskSummaryDto>> GetProjectTasksAsync(int projectId)
{
    return await _context.TaskItems
        .AsNoTracking()
        .Where(t => t.ProjectId == projectId && !t.IsArchived)
        .OrderByDescending(t => t.Priority)
        .Select(t => new TaskSummaryDto
        {
            Id = t.Id,
            Title = t.Title,
            Status = t.Status.ToString(),
            AssigneeName = t.Assignee.FullName,
            DueDate = t.DueDate
        })
        .ToListAsync();
}`
  },
  {
    id: "clinic-booking-system",
    title: "Healthcare Clinic Appointment System Backend",
    category: "enterprise",
    featured: false,
    tagline: "Medical Appointments & Patient Record Database Architecture",
    shortDescription: "Comprehensive clinic backend designed around BIS domain workflows. Bridges medical business logic with relational database optimization and ASP.NET Core APIs.",
    bannerIcon: "🩺",
    architectureBadge: "Business Systems (BIS)",
    architecture: {
      domain: "Patient, Doctor, Specialization, Appointment, MedicalRecord, Prescription",
      application: "AppointmentBookingService, DoctorAvailabilityChecker, PatientHistoryManager",
      infrastructure: "SQL Server, Relational Constraints, Transactional Integrity",
      presentation: "REST Endpoints, Swagger API Documentation, Automated Email Receipt simulation"
    },
    keyFeatures: [
      "Applied Business Information Systems (BIS) domain analysis to model real-world clinic workflows.",
      "Conflict-free appointment scheduling engine preventing double-booking of doctors.",
      "Confidential patient medical record history with strict access security.",
      "Optimized SQL Server schema normalization up to 3NF eliminating data redundancy.",
      "Comprehensive Postman collection verifying edge cases, boundary values, and status transitions."
    ],
    techStack: [
      "C#",
      "ASP.NET Core",
      "SQL Server",
      "Entity Framework Core",
      "BIS Systems Analysis",
      "RESTful API",
      "Swagger"
    ],
    githubUrl: "https://github.com/Philopateer18/Clinic-Booking-Backend",
    swaggerUrl: null,
    sampleSnippet: `// Booking Conflict Validation Service
public async Task<BookingResult> BookAppointmentAsync(AppointmentCreateDto dto)
{
    var hasConflict = await _context.Appointments
        .AnyAsync(a => a.DoctorId == dto.DoctorId 
                    && a.AppointmentDate == dto.AppointmentDate 
                    && a.TimeSlot == dto.TimeSlot 
                    && a.Status != AppointmentStatus.Cancelled);

    if (hasConflict)
    {
        return BookingResult.Failed("The requested doctor is already booked for this time slot.");
    }

    var appointment = _mapper.Map<Appointment>(dto);
    _context.Appointments.Add(appointment);
    await _context.SaveChangesAsync();

    return BookingResult.Success(appointment.Id);
}`
  }
];
