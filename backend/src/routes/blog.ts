import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@ajeetkumarnpm/medium-common-final";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = (await verify(authHeader, c.env.JWT_SECRET)) as { id: string };
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({
        message: "Incorrect inputs"
      })
    }
    const authorId = c.get("userId");
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
        date: body.date,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (error) {
    return c.json({
      message: "some error while creating post",
    });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  try {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    
    if(!success){
      c.status(411);
      return c.json({
        message: "Incorrect inputs"
      })
    }
    const userId = c.get("userId")
    const authorId = body.authorId
    if(userId == authorId){
      const blog = await prisma.post.update({
        where: {
          id: body.id,
        },
        data: {
          title: body.title,
          content: body.content
        },
      });
  
      return c.json({
        id: blog.id,
      });
    }else{
      c.status(411);
      return c.json({
        message: "this is not your's post"
      })
    }
  } catch (error) {
    c.status(403);
    return c.json({
      message: "some error occured while updating",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        date: true,
        authorId: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json({
      blogs,
    });
  } catch (error) {
    return c.json({
      message: "error while fetching data",
    });
  }
});


blogRouter.get("/userblog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const authorId = c.get("userId");
    const blogs = await prisma.post.findMany({
      where: {
        authorId: authorId
      },
      select: {
        id: true,
        title: true,
        content: true,
        date: true,
        authorId: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })

    return c.json({
      blogs,
    });
  } catch (error) {
    return c.json({
      message: "error while fetching data",
    });
  }
});




blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId")
    const blog = await prisma.post.findFirst({
      where: {
        id: id
      },
      select: {
        id: true,
        title: true,
        content: true,
        date: true,
        authorId: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json({
      blog,
      userId,
    });
  } catch (e) {
    return c.json({
      message: "error while finding",
    });
  }
});
