USE [master]
GO

CREATE DATABASE [MyApiCore]
GO


USE [MyApiCore]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 26-05-20 20:00:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 26-05-20 20:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 26-05-20 20:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 26-05-20 20:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 26-05-20 20:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 26-05-20 20:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 26-05-20 20:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 26-05-20 20:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](128) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Enderecos]    Script Date: 26-05-20 20:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Enderecos](
	[Id] [uniqueidentifier] NOT NULL,
	[FornecedorId] [uniqueidentifier] NOT NULL,
	[Logradouro] [varchar](200) NOT NULL,
	[Numero] [varchar](50) NOT NULL,
	[Complemento] [varchar](250) NULL,
	[Cep] [varchar](20) NOT NULL,
	[Bairro] [varchar](100) NOT NULL,
	[Cidade] [varchar](100) NOT NULL,
	[Estado] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Enderecos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Fornecedores]    Script Date: 26-05-20 20:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Fornecedores](
	[Id] [uniqueidentifier] NOT NULL,
	[Nome] [varchar](200) NOT NULL,
	[Documento] [varchar](14) NOT NULL,
	[TipoFornecedor] [int] NOT NULL,
	[Ativo] [bit] NOT NULL,
 CONSTRAINT [PK_Fornecedores] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Produtos]    Script Date: 26-05-20 20:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Produtos](
	[Id] [uniqueidentifier] NOT NULL,
	[FornecedorId] [uniqueidentifier] NOT NULL,
	[Nome] [varchar](200) NOT NULL,
	[Descricao] [varchar](1000) NOT NULL,
	[Imagem] [varchar](100) NOT NULL,
	[Valor] [decimal](18, 2) NOT NULL,
	[DataCadastro] [datetime2](7) NOT NULL,
	[Ativo] [bit] NOT NULL,
 CONSTRAINT [PK_Produtos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'00000000000000_CreateIdentitySchema', N'2.2.4-servicing-10062')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20190429212357_Initial', N'2.2.4-servicing-10062')
SET IDENTITY_INSERT [dbo].[AspNetUserClaims] ON 

INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (1, N'24ca00c0-975b-46d8-967d-b4ee8add5a44', N'Produto', N'Adicionar,Atualizar,Excluir')
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (2, N'24ca00c0-975b-46d8-967d-b4ee8add5a44', N'Fornecedor', N'Adicionar,Atualizar,Excluir')
SET IDENTITY_INSERT [dbo].[AspNetUserClaims] OFF
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'24ca00c0-975b-46d8-967d-b4ee8add5a44', N'teste@teste.com', N'TESTE@TESTE.COM', N'teste@teste.com', N'TESTE@TESTE.COM', 1, N'AQAAAAEAACcQAAAAECCc/K3d8MAmvzEJoqw2dphg9gNColBA80Zh5vkPEbTGeUGvUIyn+MDtGaEucqNKDg==', N'LEUNYD4L2KWCN4RQGWRVDBKZIFO2B7KV', N'd511830c-6351-432e-beb9-bd36d7fe5444', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[Enderecos] ([Id], [FornecedorId], [Logradouro], [Numero], [Complemento], [Cep], [Bairro], [Cidade], [Estado]) VALUES (N'29caa063-e972-4991-7636-08d6cdc617a3', N'02138343-6d88-47b7-4d45-08d6cdc617a1', N'Rua do Acre', N'1233', N'Lojas', N'03181100', N'Vila Bertioga', N'São Paulo', N'SP')
INSERT [dbo].[Enderecos] ([Id], [FornecedorId], [Logradouro], [Numero], [Complemento], [Cep], [Bairro], [Cidade], [Estado]) VALUES (N'2bcd2658-5a98-469d-7637-08d6cdc617a3', N'cef33216-e53e-41d9-4d46-08d6cdc617a1', N'Rua Antônio Macedo', N'3453', N'Fundos', N'03087010', N'Parque São Jorge', N'São Paulo', N'SP')
INSERT [dbo].[Enderecos] ([Id], [FornecedorId], [Logradouro], [Numero], [Complemento], [Cep], [Bairro], [Cidade], [Estado]) VALUES (N'be2a8535-6625-47f6-7638-08d6cdc617a3', N'f25952fc-3ff3-4b52-4d47-08d6cdc617a1', N'Rua Coronel Irineu de Castro', N'43', N'CJ 1106', N'03333050', N'Jardim Anália Franco', N'São Paulo', N'SP')
INSERT [dbo].[Enderecos] ([Id], [FornecedorId], [Logradouro], [Numero], [Complemento], [Cep], [Bairro], [Cidade], [Estado]) VALUES (N'2306efaf-b5d6-40a3-ae79-08d6ce6e5169', N'b582a621-472d-403a-46af-08d6ce6e5165', N'Avenida Manoel Domingos Pinto', N'4450', N'Loja', N'05120000', N'Parque Anhangüera', N'São Paulo', N'SP')
INSERT [dbo].[Fornecedores] ([Id], [Nome], [Documento], [TipoFornecedor], [Ativo]) VALUES (N'02138343-6d88-47b7-4d45-08d6cdc617a1', N'Livros Nerds', N'66511169081', 1, 0)
INSERT [dbo].[Fornecedores] ([Id], [Nome], [Documento], [TipoFornecedor], [Ativo]) VALUES (N'cef33216-e53e-41d9-4d46-08d6cdc617a1', N'Amazon Books', N'66514608000142', 2, 1)
INSERT [dbo].[Fornecedores] ([Id], [Nome], [Documento], [TipoFornecedor], [Ativo]) VALUES (N'f25952fc-3ff3-4b52-4d47-08d6cdc617a1', N'Eduardo Pires Livros', N'12631823214', 1, 1)
INSERT [dbo].[Fornecedores] ([Id], [Nome], [Documento], [TipoFornecedor], [Ativo]) VALUES (N'b582a621-472d-403a-46af-08d6ce6e5165', N'SeboTech', N'30390600822', 1, 1)
INSERT [dbo].[Produtos] ([Id], [FornecedorId], [Nome], [Descricao], [Imagem], [Valor], [DataCadastro], [Ativo]) VALUES (N'912ac3e8-8ca0-4708-f520-08d6d7f166aa', N'02138343-6d88-47b7-4d45-08d6cdc617a1', N'JavaScript nas fronteiras', N'JavaScript nas fronteiras', N'1dbbd291-279f-4743-a781-0c92a482bc2b_JQuery.jpg', CAST(1.00 AS Decimal(18, 2)), CAST(N'2019-05-13T19:26:39.0085034' AS DateTime2), 1)
INSERT [dbo].[Produtos] ([Id], [FornecedorId], [Nome], [Descricao], [Imagem], [Valor], [DataCadastro], [Ativo]) VALUES (N'1067326c-5dd4-4d86-d14c-08d6d7f28ecc', N'b582a621-472d-403a-46af-08d6ce6e5165', N'Regex fácil!', N'Regex fácil!', N'4677e4a2-c57e-42f9-8cef-7ea55aa92c33_Regex.jpg', CAST(500.00 AS Decimal(18, 2)), CAST(N'2019-05-13T19:30:09.7901809' AS DateTime2), 1)
INSERT [dbo].[Produtos] ([Id], [FornecedorId], [Nome], [Descricao], [Imagem], [Valor], [DataCadastro], [Ativo]) VALUES (N'ea472496-6d53-4744-4b47-08d6d7f4eeba', N'f25952fc-3ff3-4b52-4d47-08d6cdc617a1', N'MVC 5', N'MVC 5', N'9e2b29e2-f7e6-4fbf-8696-761ebd462f47_MVC5.jpg', CAST(122.00 AS Decimal(18, 2)), CAST(N'2019-05-13T19:47:09.7866487' AS DateTime2), 1)
INSERT [dbo].[Produtos] ([Id], [FornecedorId], [Nome], [Descricao], [Imagem], [Valor], [DataCadastro], [Ativo]) VALUES (N'0f1a7ed3-091d-457f-2fb3-08d6d7fc893a', N'02138343-6d88-47b7-4d45-08d6cdc617a1', N'Razor Completo', N'Razor Completo', N'cc0a711a-a172-48a1-ab69-b074b572321b_Razor.jpg', CAST(125.00 AS Decimal(18, 2)), CAST(N'2019-05-13T20:41:35.4087087' AS DateTime2), 0)
INSERT [dbo].[Produtos] ([Id], [FornecedorId], [Nome], [Descricao], [Imagem], [Valor], [DataCadastro], [Ativo]) VALUES (N'cce7be65-5489-46aa-2fb4-08d6d7fc893a', N'cef33216-e53e-41d9-4d46-08d6cdc617a1', N'CSS Total', N'CSS Total ', N'1e723e03-a406-442b-b2c8-f4c561681379_CSS.jpg', CAST(12.00 AS Decimal(18, 2)), CAST(N'2019-05-13T21:17:31.1770832' AS DateTime2), 1)
INSERT [dbo].[Produtos] ([Id], [FornecedorId], [Nome], [Descricao], [Imagem], [Valor], [DataCadastro], [Ativo]) VALUES (N'1a3fbec5-4dc3-4455-2fb5-08d6d7fc893a', N'b582a621-472d-403a-46af-08d6ce6e5165', N'HTML 5', N'HTML 5', N'734ed7ec-23c7-4b6a-80ea-9cbf445a6729_HTML.jpg', CAST(10.00 AS Decimal(18, 2)), CAST(N'2019-05-13T21:42:32.2754874' AS DateTime2), 1)
INSERT [dbo].[Produtos] ([Id], [FornecedorId], [Nome], [Descricao], [Imagem], [Valor], [DataCadastro], [Ativo]) VALUES (N'74db5a66-3967-4547-4879-08d7eebb64b7', N'cef33216-e53e-41d9-4d46-08d6cdc617a1', N'Java para Seniors', N'Java para Seniors', N'2994c744-02d5-4b4a-98d1-e04ae8709e5c_Java.jpg', CAST(250.00 AS Decimal(18, 2)), CAST(N'2020-05-02T14:08:11.2285147' AS DateTime2), 0)
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[Enderecos]  WITH CHECK ADD  CONSTRAINT [FK_Enderecos_Fornecedores_FornecedorId] FOREIGN KEY([FornecedorId])
REFERENCES [dbo].[Fornecedores] ([Id])
GO
ALTER TABLE [dbo].[Enderecos] CHECK CONSTRAINT [FK_Enderecos_Fornecedores_FornecedorId]
GO
ALTER TABLE [dbo].[Produtos]  WITH CHECK ADD  CONSTRAINT [FK_Produtos_Fornecedores_FornecedorId] FOREIGN KEY([FornecedorId])
REFERENCES [dbo].[Fornecedores] ([Id])
GO
ALTER TABLE [dbo].[Produtos] CHECK CONSTRAINT [FK_Produtos_Fornecedores_FornecedorId]
GO

USE MyApiCore
select * from AspNetUsers
select * from Fornecedores f inner join Produtos p on f.Id = p.FornecedorId