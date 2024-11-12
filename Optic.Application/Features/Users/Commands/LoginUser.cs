﻿using Carter;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Optic.Application.Infrastructure.Sqlite;
using Optic.Domain.Authentications;
using Optic.Domain.Shared;
using SNET.Framework.Domain.Authentications.Jwt;

namespace Optic.Application.Features.Users.Commands;
public class LoginUser : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/login", async (LoginUserCommand command, IMediator mediator) =>
        {
            var res = await mediator.Send(command);

            if (res.IsSuccess)
            {
                return Results.Ok(res);
            }
            else
            {
                return Results.BadRequest(res);
            }
        })
     .WithName("Autentication")
     .WithTags("Login")
     .Produces<Result>(StatusCodes.Status200OK)
     .Produces(StatusCodes.Status400BadRequest);
    }


    public record LoginUserCommand : IRequest<Result>
    {
        public string Email { get; init; } = string.Empty;
        public string Password { get; init; } = string.Empty;
    }

    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, Result>
    {
        private readonly IMediator _mediator;
        private readonly IManagerToken _managerToken;
        private readonly AppDbContext _context;
        private readonly IValidator<LoginUserCommand> _validator;
        public LoginUserCommandHandler(
            AppDbContext context,
            IValidator<LoginUserCommand> validator,
            IMediator mediator,
            IManagerToken managerToken)
        {
            this._context = context;
            _validator = validator;
            _mediator = mediator;
            this._managerToken = managerToken;
        }

        public async Task<Result> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var result = _validator.Validate(request);
            if (!result.IsValid)
            {
                return Result.Failure(new Error("Autentication.ValidationError", "Datos no válidos"));
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null)
            {
                return Result.Failure(new Error("Autentication.NotUserMatch", "Credenciales de acceso no validas"));
            }

            var resLogin = user.Login(request.Password);

            if (resLogin.IsSuccess)
            {
                var token = _managerToken.GenerateToken(user);
                return Result<TokenModel>.Success(token, "Autenticado correctamente");
            }
            else
            {
                return resLogin;
            }

        }
    }

    public class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
    {
        public LoginUserCommandValidator()
        {

            RuleFor(x => x.Email).NotEmpty()
                .WithMessage("El campo email es obligatorio")
                .EmailAddress()
                .WithMessage("Debe ingresar un email valido");

            RuleFor(x => x.Password).NotEmpty()
                .WithMessage("El campo contraseña es obligatorio")
                .MinimumLength(6)
                .WithMessage("Mimimo 6 caracrteres");

        }
    }

}
