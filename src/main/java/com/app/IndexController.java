package com.app;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class IndexController {

	@RequestMapping(value = "/**", method = GET)
	public String index(Model model, HttpServletRequest request){
		String path = request.getServletPath();
		String query = request.getQueryString();
		String requestPath = (query != null) ? String.format("%s?%s", path, query) : path;
		model.addAttribute("__requestPath", requestPath);
		return "index";
	}
}
